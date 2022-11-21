import { formatCurrency as format } from '@coingecko/cryptoformat';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { default as dayjs } from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ActivityIndicator, Dialog, Portal, Text } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import config from '../../config/MainConfig';
import {
  buyCryptocurrency,
  getCryptocurrency,
  getCryptocurrencyHistory,
  getWallet,
  sellCryptocurrency,
} from '../../redux/action_creators/cryptocurrency';
import { show } from '../../redux/slices/snackbarSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { TextColor } from '../../util/ColorPalette';
import { calculateBrightness, LightenDarkenColor } from '../../util/ColorUtil';
import { setFloat } from '../../util/NumberUtilts';
import { DrawerParamList } from '../navigation/DrawerNavigationScreen';

type NavigationProps = DrawerScreenProps<
  DrawerParamList,
  'CryptocurrencyDetails'
>;

const CryptocurrencyDetailsScreen = ({
  route,
  navigation,
}: NavigationProps) => {
  const coinId = route.params.coinId;

  const coin = useSelector((state: RootState) => state.crypto.coin);
  const history = useSelector((state: RootState) => state.crypto.history);
  const wallet = useSelector((state: RootState) => state.crypto.wallet);
  const buyStatus = useSelector((state: RootState) => state.crypto._status.buy);
  const sellStatus = useSelector(
    (state: RootState) => state.crypto._status.sell
  );
  const [chartDataLoaded, setChartDataLoaded] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [timeframe, setTimeframe] = useState('7d');

  const originalColor = coin?.color;
  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

  const lighterColor = LightenDarkenColor(color ?? '#000000', 60);

  const dispatch = useDispatch<AppDispatch>();

  const walletEntry =
    wallet?.cryptocurrencies &&
    Object.entries(wallet?.cryptocurrencies).find(([key]) => {
      return key === coin?.id;
    });

  const walletAmount = walletEntry ? walletEntry[1] : 0.0;

  useLayoutEffect(() => {
    dispatch(getCryptocurrency({ id: coinId }));
    dispatch(getCryptocurrencyHistory({ id: coinId, timeframe })).then(() =>
      setChartDataLoaded(true)
    );
  }, [coinId]);

  const interval = 20000;
  useInterval(() => {
    dispatch(getCryptocurrency({ id: coinId }));
    (timeframe === '24h' || timeframe === '7d') &&
      getCryptocurrencyHistory({ id: coinId, timeframe });
  }, interval);

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  useEffect(() => {
    setBuyAmount('');
    setSellAmount('');
  }, [coinId]);

  useEffect(() => {
    dispatch(getCryptocurrencyHistory({ id: coinId, timeframe })).then(() =>
      setChartDataLoaded(true)
    );
  }, [timeframe]);

  const dateFormat = config.defaults.dateFormat;
  const maxDateLabelCount = 4;
  let labelsCreated = 0;
  const dateFormatShort = 'DD/MM/YYYY';
  const allTimeHighDate = dayjs(coin?.ath_date).format(dateFormatShort);
  const allTimeLowDate = dayjs(coin?.atl_date).format(dateFormatShort);
  const { width } = useWindowDimensions();

  const formatCurrency = (currency: number) => {
    return format(
      currency,
      config.defaults.baseCurrency.symbol,
      config.defaults.localeShort
    );
  };

  const priceChange = (history: number[]) => {
    const lastElement = history[history.length - 1];
    const lastButOneElement = history[history.length - 2];
    return lastElement - lastButOneElement;
  };

  const priceChangeIcon = () => {
    return coin?.sparkline_in_7d?.price &&
      priceChange(coin?.sparkline_in_7d?.price) > 0 ? (
      <Feather name="trending-up" color="green" size={25} />
    ) : (
      <Feather name="trending-down" color="red" size={25} />
    );
  };

  const priceChangeText = () => {
    return (
      coin?.sparkline_in_7d?.price &&
      (priceChange(coin?.sparkline_in_7d?.price) > 0 ? (
        <Text style={{ color: 'green', fontSize: 18 }}>
          {`+ ${formatCurrency(priceChange(coin?.sparkline_in_7d?.price))}`}
        </Text>
      ) : (
        <Text style={{ color: 'red', fontSize: 18 }}>
          {`- ${formatCurrency(
            Math.abs(priceChange(coin?.sparkline_in_7d?.price))
          )}`}
        </Text>
      ))
    );
  };

  const createNameFromTimeframe = (tf: string) => {
    switch (tf) {
      case '24h':
        return '24 hours';
      case '7d':
        return '7 days';
      case '30d':
        return '30 days';
      case '1y':
        return '1 year';
      case 'max':
        return 'Max';
    }
  };

  const getDataByTimeframe = (tf: string) => {
    switch (tf) {
      case '24h':
        return history?.history_24h ?? [];
      case '7d':
        return history?.history_7d ?? [];
      case '30d':
        return history?.history_30d ?? [];
      case '1y':
        return history?.history_1y ?? [];
      case 'max':
        return history?.history_max ?? [];
      default:
        return history?.history_7d ?? [];
    }
  };

  const calculateLabels = (timeframe: string) => {
    const initialLabels = getDataByTimeframe(timeframe).map((historyEntry) =>
      typeof historyEntry.timestamp === 'number'
        ? historyEntry.timestamp
        : Number(0)
    ) ?? ['', ''];

    const labelRadix = Math.max(
      Math.floor(initialLabels.length / maxDateLabelCount),
      1
    );

    return initialLabels.map((label, idx) =>
      idx % labelRadix === 0 ? label.toString() : ''
    );
  };

  const priceData = {
    labels: calculateLabels(timeframe) ?? ['', ''],
    datasets: [
      {
        data: getDataByTimeframe(timeframe).map((historyEntry) =>
          typeof historyEntry.price === 'number'
            ? historyEntry.price
            : Number(0)
        ) ?? [0, 0],
        color: () => color ?? 'black',
      },
    ],
  };

  const [buyDialogVisible, setBuyDialogVisible] = useState(false);
  const hideBuyDialog = () => setBuyDialogVisible(false);

  const BuyDialog = () => {
    return (
      <Portal>
        <Dialog
          visible={buyDialogVisible}
          onDismiss={hideBuyDialog}
          style={styles.buyDialog}
        >
          <Dialog.Title style={{ fontSize: 20 }}>
            {`Are you sure you want to buy ${
              buyAmount !== '' ? buyAmount : 0
            }\u00A0${coin?.name ?? 'coin'} for ${
              coin?.current_price
                ? formatCurrency(Number(buyAmount) * coin?.current_price)
                    .toString()
                    .replace(' ', '\u00A0')
                : '?'
            } ?`}
          </Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  await dispatch(
                    buyCryptocurrency({ id: coinId, amount: Number(buyAmount) })
                  );
                  if (buyStatus.slice(0, 7) === 'success') {
                    dispatch(
                      show({
                        message: `Successfully bought ${Number(
                          buyAmount
                        )}\u00A0${coin?.name}!`,
                        type: 'success',
                      })
                    );
                    dispatch(getWallet());
                  }
                  hideBuyDialog();
                }}
                disabled={false}
              >
                <LinearGradient
                  colors={['green', '#11b50e']}
                  style={[styles.tradeButton, { marginRight: 100 }]}
                >
                  <Text style={styles.tradeButtonText}>Yes</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  hideBuyDialog();
                }}
                disabled={false}
              >
                <LinearGradient
                  colors={['#961805', 'red']}
                  style={styles.tradeButton}
                >
                  <Text style={styles.tradeButtonText}>No</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  };

  const [sellDialogVisible, setSellDialogVisible] = useState(false);
  const hideSellDialog = () => setSellDialogVisible(false);

  const SellDialog = () => {
    return (
      <Portal>
        <Dialog
          visible={sellDialogVisible}
          onDismiss={hideSellDialog}
          style={styles.sellDialog}
        >
          <Dialog.Title style={{ fontSize: 20 }}>
            {`Are you sure you want to sell ${
              sellAmount !== '' ? sellAmount : 0
            }\u00A0${coin?.name ?? 'coin'} for ${
              coin?.current_price
                ? formatCurrency(Number(sellAmount) * coin?.current_price)
                    .toString()
                    .replace(' ', '\u00A0')
                : '?'
            } ?`}
          </Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  await dispatch(
                    sellCryptocurrency({
                      id: coinId,
                      amount: Number(sellAmount),
                    })
                  );
                  if (sellStatus.slice(0, 7) === 'success') {
                    dispatch(
                      show({
                        message: `Successfully sold ${Number(
                          sellAmount
                        )}\u00A0${coin?.name}!`,
                        type: 'success',
                      })
                    );
                    dispatch(getWallet());
                  }
                  hideSellDialog();
                }}
                disabled={false}
              >
                <LinearGradient
                  colors={['green', '#11b50e']}
                  style={[styles.tradeButton, { marginRight: 100 }]}
                >
                  <Text style={styles.tradeButtonText}>Yes</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  hideSellDialog();
                }}
                disabled={false}
              >
                <LinearGradient
                  colors={['#961805', 'red']}
                  style={styles.tradeButton}
                >
                  <Text style={styles.tradeButtonText}>No</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={{
              uri: coin?.image,
            }}
          />
        </View>
        <View style={styles.baseData}>
          <View style={styles.baseDataRow}>
            <Text style={styles.nameTextLabel}>Name: </Text>
            <Text style={[styles.nameText, { color: color }]}>
              {coin?.name ?? '?'}
            </Text>
          </View>
          <View style={styles.baseDataRow}>
            <Text style={styles.signTextLabel}>Sign: </Text>
            <Text style={[styles.signText, { color: color }]}>
              {coin?.symbol?.toUpperCase() ?? '?'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.headerBottom}>
        <View style={styles.dataRow}>
          <Text style={styles.rankTextLabel}>Coingecko rank:</Text>
          <Text style={styles.rankText}>
            {(coin?.market_cap_rank && ' #' + coin?.market_cap_rank) ?? '?'}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.priceTextLabel}>Current price: </Text>
          <Text style={styles.priceText}>
            {(coin?.current_price && formatCurrency(coin?.current_price)) ??
              '?'}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.priceChangeTextLabel}>Price change: </Text>
          <View style={styles.priceChange}>
            <View>
              {coin?.sparkline_in_7d?.price[
                coin?.sparkline_in_7d.price.length - 1
              ] &&
                coin?.sparkline_in_7d.price[
                  coin?.sparkline_in_7d.price.length - 2
                ] &&
                priceChangeIcon()}
            </View>
            <View>
              {coin?.sparkline_in_7d?.price[
                coin?.sparkline_in_7d.price.length - 1
              ] &&
              coin?.sparkline_in_7d.price[
                coin?.sparkline_in_7d.price.length - 2
              ] ? (
                <Text style={{ marginStart: 10 }}>{priceChangeText()}</Text>
              ) : (
                <Text style={[styles.noData, { marginStart: 15 }]}>
                  No price data!
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.maxPriceTextLabel}>Max price: </Text>
          <Text style={styles.maxPriceText}>
            {`${(coin?.ath && formatCurrency(coin?.ath)) ?? '?'}`}
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.minPriceTextLabel}>Min price: </Text>
          <Text style={styles.minPriceText}>
            {`${(coin?.ath && formatCurrency(coin?.atl ?? 0)) ?? '?'}`}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>
          Buy or sell {coin?.name ?? 'this coin'}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.labelText}>Your wealth: </Text>
          <Text style={[styles.text, { color: 'green', fontWeight: 'bold' }]}>
            {formatCurrency(wallet?.referenceCurrency ?? 0)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.labelText}>
            Your {coin?.name ?? 'coin'} stock:
          </Text>
          <Text
            style={[
              styles.text,
              { color: color ?? TextColor, fontWeight: 'bold' },
            ]}
          >
            {formatCurrency(walletAmount ?? 0)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={async () => {
              setBuyDialogVisible(true);
            }}
            disabled={buyAmount === ''}
          >
            <LinearGradient
              colors={
                buyAmount === ''
                  ? ['#dedede', '#ededed']
                  : [lighterColor ?? 'yellow', color ?? 'orange']
              }
              style={styles.tradeButtonFull}
            >
              <Text
                style={[
                  styles.tradeButtonsText,
                  { color: buyAmount === '' ? 'gray' : 'white' },
                ]}
              >
                {'Buy ' + coin?.name ?? 'coin'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TextInput
            style={styles.numberInput}
            placeholder="Amount"
            autoCapitalize="none"
            onChangeText={(v) => setFloat(v, setBuyAmount)}
            value={buyAmount.toString()}
            keyboardType="numeric"
            underlineColorAndroid={TextColor}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={async () => {
              setSellDialogVisible(true);
            }}
            disabled={sellAmount === ''}
          >
            <LinearGradient
              colors={
                sellAmount === ''
                  ? ['#dedede', '#ededed']
                  : [lighterColor ?? 'yellow', color ?? 'orange']
              }
              style={styles.tradeButtonFull}
            >
              <Text
                style={[
                  styles.tradeButtonsText,
                  { color: sellAmount === '' ? 'gray' : 'white' },
                ]}
              >
                {'Sell ' + coin?.name ?? 'coin'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TextInput
            style={styles.numberInput}
            placeholder="Amount"
            autoCapitalize="none"
            onChangeText={(v) => setFloat(v, setSellAmount)}
            value={sellAmount.toString()}
            keyboardType="numeric"
            underlineColorAndroid={TextColor}
          />
        </View>
        <Text style={styles.title}>Price history</Text>
        <View style={styles.priceChartButtons}>
          {['24h', '7d', '30d', '1y', 'max'].map((tf) => {
            return (
              <View key={tf}>
                <TouchableOpacity
                  onPress={async () => {
                    setChartDataLoaded(false);
                    setTimeframe(tf);
                    await dispatch(
                      getCryptocurrencyHistory({ id: coinId, timeframe: tf })
                    );
                  }}
                  disabled={false}
                >
                  <LinearGradient
                    colors={
                      timeframe === tf
                        ? [lighterColor ?? 'yellow', color ?? 'orange']
                        : ['white', 'white']
                    }
                    style={
                      timeframe === tf
                        ? styles.priceChartButtonFull
                        : [
                            styles.priceChartButtonOutlined,
                            { borderColor: color },
                          ]
                    }
                  >
                    <Text
                      style={[
                        styles.priceChartButtonsText,
                        { color: timeframe === tf ? 'white' : color },
                      ]}
                    >
                      {createNameFromTimeframe(tf)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {BuyDialog()}
        {SellDialog()}
        {/* LineChart */}
        {chartDataLoaded ? (
          coin?.sparkline_in_7d?.price &&
          coin?.sparkline_in_7d?.price?.length >= 3 ? (
            <View style={styles.priceChart}>
              <LineChart
                style={{ paddingRight: 65 }}
                data={priceData}
                height={220}
                width={Dimensions.get('window').width}
                chartConfig={{
                  color: () => TextColor ?? 'white',
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  fillShadowGradientOpacity: 0.2,
                  strokeWidth: 1,
                  useShadowColorFromDataset: true,
                  propsForBackgroundLines: {
                    strokeDasharray: 2,
                  },
                  propsForHorizontalLabels: {
                    fontSize: 10,
                  },
                  propsForVerticalLabels: {
                    fontSize: 10,
                  },
                }}
                bezier
                withDots={false}
                withInnerLines={false}
                withShadow={true}
                xLabelsOffset={0}
                formatYLabel={(value) => formatCurrency(Number(value))}
                formatXLabel={(value) => {
                  if (value === '') {
                    return '';
                  } else {
                    labelsCreated++;
                    if (labelsCreated <= maxDateLabelCount) {
                      return dayjs
                        .unix(Number(value) / 1000)
                        .format(dateFormatShort);
                    } else {
                      return '';
                    }
                  }
                }}
              />
            </View>
          ) : (
            <Text
              style={[
                styles.noData,
                { position: 'relative', marginRight: 80, marginTop: 10 },
              ]}
            >
              No price data!
            </Text>
          )
        ) : (
          <View style={{ flex: 1, padding: 20, marginVertical: 30 }}>
            <ActivityIndicator color={TextColor} size={40} />
          </View>
        )}
        {/* LineChart end */}
      </View>
      <View>
        <Text style={styles.title}>Description</Text>
        <View>
          <RenderHtml
            contentWidth={width}
            source={{ html: coin?.description ?? '' }}
            baseStyle={styles.description}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 15,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
    color: TextColor,
  },
  labelText: {
    fontWeight: '500',
    marginRight: 10,
    marginBottom: 5,
    fontSize: 18,
    color: TextColor,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    color: TextColor,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoView: {
    flex: 2,
  },
  logo: {
    width: 80,
    height: 80,
    maxHeight: 80,
    maxWidth: 80,
  },
  baseData: {
    flex: 5,
    marginTop: 10,
  },
  baseDataRow: {
    flexDirection: 'row',
    flex: 5,
  },
  nameTextLabel: {
    fontWeight: '700',
    marginRight: 11,
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  nameText: {
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  signTextLabel: {
    fontWeight: '700',
    marginRight: 24,
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  signText: {
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  headerBottom: { marginTop: 15 },
  dataRow: {
    flexDirection: 'row',
    flex: 5,
  },
  rankTextLabel: {
    fontWeight: '500',
    marginRight: 20,
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  rankText: {
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  priceTextLabel: {
    fontWeight: '600',
    marginRight: 42,
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  priceText: {
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  priceChange: {
    flexDirection: 'row',
    marginTop: 5,
  },
  priceChangeTextLabel: {
    fontWeight: '500',
    marginRight: 45,
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  maxPriceTextLabel: {
    fontWeight: '500',
    marginRight: 70,
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  maxPriceText: {
    marginTop: 5,
    fontWeight: '500',
    fontSize: 18,
    color: TextColor,
  },
  minPriceTextLabel: {
    fontWeight: '500',
    marginRight: 75,
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  minPriceText: {
    marginTop: 5,
    fontWeight: '500',
    fontSize: 18,
    color: TextColor,
  },
  priceChart: {},
  priceChartButtons: {
    flexDirection: 'row',
    color: TextColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  priceChartButtonFull: {
    overflow: 'hidden',
    borderRadius: 10,
    marginEnd: 10,
    padding: 5,
  },
  priceChartButtonOutlined: {
    borderRadius: 10,
    marginEnd: 10,
    padding: 5,
    borderWidth: 1,
  },
  priceChartButtonsText: {
    fontWeight: '500',
    fontSize: 14,
    color: TextColor,
  },
  tradeButtonFull: {
    marginVertical: 10,
    borderRadius: 10,
    marginEnd: 10,
    padding: 5,
  },
  tradeButtonsText: {
    marginHorizontal: 10,
    fontWeight: '500',
    fontSize: 22,
    color: TextColor,
  },
  buyDialog: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  sellDialog: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  numberInput: {
    flex: 1,
    paddingLeft: 10,
    color: TextColor,
    padding: 0,
    margin: 0,
  },
  description: { color: TextColor, lineHeight: 20, marginBottom: 30 },
  noData: {
    color: 'red',
  },
  tradeButton: {
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    marginEnd: 10,
    padding: 5,
  },
  tradeButtonText: {
    marginHorizontal: 10,
    fontWeight: '500',
    fontSize: 22,
    color: 'white',
  },
});

export default CryptocurrencyDetailsScreen;
