import { formatCurrency as format } from '@coingecko/cryptoformat';
import { default as dayjs } from 'dayjs';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, TouchableRipple } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import config from '../config/MainConfig';
import ICryptocurrency from '../interfaces/cryptocurrency/ICryptocurrency';
import { TextColor } from '../util/ColorPalette';
import { calculateBrightness, LightenDarkenColor } from '../util/ColorUtil';

type Props = ICryptocurrency & { lastElementInList: boolean };

const dateFormat = config.defaults.dateFormat;

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

const CryptocurrencyCard = (props: Props) => {
  const allTimeHighDate = dayjs(props.ath_date).format(dateFormat);
  const originalColor = props.color;

  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

  const data = {
    labels: [],
    datasets: [
      {
        data: props.sparkline_in_7d.price.map((v) =>
          typeof v === 'number' ? v : Number(0.0)
        ),
        color: () => color,
      },
    ],
  };

  const priceChangeIcon = () => {
    return priceChange(props.sparkline_in_7d.price) > 0 ? (
      <Feather name="trending-up" color="green" size={40} />
    ) : (
      <Feather name="trending-down" color="red" size={40} />
    );
  };

  const priceChangeText = () => {
    return priceChange(props.sparkline_in_7d.price) > 0 ? (
      <Text style={{ color: 'green' }}>
        {`+ ${formatCurrency(priceChange(props.sparkline_in_7d.price))}`}
      </Text>
    ) : (
      <Text style={{ color: 'red' }}>
        {`- ${formatCurrency(
          Math.abs(priceChange(props.sparkline_in_7d.price))
        )}`}
      </Text>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { marginBottom: props.lastElementInList ? 5 : 15 },
      ]}
    >
      <TouchableRipple
        onPress={() => console.log('Pressed ' + props.name)}
        rippleColor="rgba(0, 0, 0, .1)"
        style={[styles.ripple]}
        borderless
      >
        <>
          <View style={styles.cardTop}>
            <View style={styles.logoView}>
              <Image
                style={styles.logo}
                source={{
                  uri: props.image,
                }}
              />
            </View>
            <View style={styles.baseData}>
              <Text style={styles.nameText}>
                {props.name + ' (' + props.symbol.toUpperCase() + ')'}
              </Text>
              <Text style={styles.rankText}>
                {'CoinGecko Rank' + ' #' + props.market_cap_rank}
              </Text>
              <Text style={styles.priceText}>
                {formatCurrency(props.current_price)}
              </Text>
              <Text style={styles.maxPriceText}>{`MAX: ${formatCurrency(
                props.ath
              )}`}</Text>
              <Text style={styles.maxPriceDate}>
                {`(On ${
                  allTimeHighDate.toString() !== 'Invalid Date'
                    ? allTimeHighDate.toString()
                    : '-'
                })`}
              </Text>
            </View>
          </View>
          <View style={styles.cardBottom}>
            <View style={styles.priceChange}>
              <View style={styles.priceChangeIcon}>
                {props.sparkline_in_7d.price[
                  props.sparkline_in_7d.price.length - 1
                ] &&
                  props.sparkline_in_7d.price[
                    props.sparkline_in_7d.price.length - 2
                  ] &&
                  priceChangeIcon()}
              </View>
              <View style={styles.priceChangeText}>
                {props.sparkline_in_7d.price[
                  props.sparkline_in_7d.price.length - 1
                ] &&
                props.sparkline_in_7d.price[
                  props.sparkline_in_7d.price.length - 2
                ] ? (
                  <Text style={{ marginStart: 10 }}>{priceChangeText()}</Text>
                ) : (
                  <Text style={[styles.noData, { marginStart: 15 }]}>
                    No price data!
                  </Text>
                )}
              </View>
            </View>
            {props.sparkline_in_7d.price.length >= 3 ? (
              <View style={styles.sparkline}>
                <LineChart
                  style={{ paddingRight: 0, margin: 0, shadowColor: 'green' }}
                  data={data}
                  height={60}
                  width={160}
                  chartConfig={{
                    color: () => color,
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
        </>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 5,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: 'gray',
    elevation: 5,
    backgroundColor: 'white',
  },
  ripple: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  cardTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoView: {
    flex: 4,
  },
  logo: {
    marginStart: 10,
    width: 100,
    height: 100,
    maxHeight: 100,
    maxWidth: 100,
  },
  baseData: {
    flex: 5,
  },
  nameText: {
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 20,
    color: TextColor,
  },
  rankText: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 14,
    color: '#627a8a',
  },
  priceText: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 22,
    color: TextColor,
  },
  maxPriceText: {
    fontWeight: '600',
    marginBottom: 2,
    fontSize: 15,
    color: TextColor,
  },
  maxPriceDate: {
    fontWeight: '600',
    marginBottom: 2,
    fontSize: 14,
    color: '#627a8a',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceChange: {
    flex: 1,
    marginTop: 10,
    marginStart: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  priceChangeIcon: { flex: 1, marginStart: 35 },
  priceChangeText: { flex: 1 },
  sparkline: {
    flex: 1,
    marginRight: 35,
  },
  noData: {
    color: 'red',
  },
});

export default React.memo(CryptocurrencyCard);
