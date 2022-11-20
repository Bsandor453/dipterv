import { formatCurrency as format } from '@coingecko/cryptoformat';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { default as dayjs } from 'dayjs';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import config from '../../config/MainConfig';
import {
  getCryptocurrency,
  getCryptocurrencyHistory,
  getWallet,
} from '../../redux/action_creators/cryptocurrency';
import { AppDispatch, RootState } from '../../redux/store';
import { TextColor } from '../../util/ColorPalette';
import { calculateBrightness, LightenDarkenColor } from '../../util/ColorUtil';
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

  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0.0);
  const [sellAmount, setSellAmount] = useState(0.0);
  const [timeframe, setTimeframe] = useState('7d');

  const originalColor = coin?.color;
  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(getCryptocurrency({ id: coinId }));
    dispatch(getCryptocurrencyHistory({ id: coinId, timeframe }));
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
    getCryptocurrencyHistory({ id: coinId, timeframe });
  }, [timeframe]);

  /*
  useEffect(() => {
    getWallet();
  }, [infoMessage]);
  */

  const dateFormat = config.defaults.dateFormat;
  const dateFormatShort = 'DD MM, YYYY';
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

  const priceData = {
    labels: [],
    datasets: [
      {
        data:
          coin?.sparkline_in_7d?.price.map((v) =>
            typeof v === 'number' ? v : Number(0.0)
          ) ?? [],
        color: () => color ?? 'black',
      },
    ],
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
              {coin?.name}
            </Text>
          </View>
          <View style={styles.baseDataRow}>
            <Text style={styles.signTextLabel}>Sign: </Text>
            <Text style={[styles.signText, { color: color }]}>
              {coin?.symbol?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.headerBottom}>
        <View style={styles.dataRow}>
          <Text style={styles.rankTextLabel}>Coingecko rank:</Text>
          <Text style={styles.rankText}>{' #' + coin?.market_cap_rank}</Text>
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
        <Text style={styles.title}>Price history</Text>
        {coin?.sparkline_in_7d?.price &&
        coin?.sparkline_in_7d?.price?.length >= 3 ? (
          <View style={styles.priceChart}>
            <LineChart
              style={{ paddingRight: 0, margin: 0 }}
              data={priceData}
              height={60}
              width={160}
              chartConfig={{
                color: () => color ?? 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                fillShadowGradientOpacity: 0.2,
                strokeWidth: 1,
              }}
              withDots={false}
              withHorizontalLabels={false}
              withInnerLines={false}
              withHorizontalLines={false}
              withOuterLines={false}
              withScrollableDot={false}
              withVerticalLabels={false}
              withVerticalLines={false}
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
        )}
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
    marginRight: 10,
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
  priceChart: {
    flex: 1,
    marginRight: 35,
  },
  description: { color: TextColor, lineHeight: 20, marginBottom: 30 },
  noData: {
    color: 'red',
  },
});

export default CryptocurrencyDetailsScreen;
