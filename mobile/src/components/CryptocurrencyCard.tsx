import { default as dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text } from 'react-native-paper';
import ImageColors from 'react-native-image-colors';
import ICryptocurrency from '../interfaces/cryptocurrency/ICryptocurrency';
import { getColorFromURL } from 'rn-dominant-color';
import Feather from 'react-native-vector-icons/Feather';
import { calculateBrightness, LightenDarkenColor } from '../util/ColorUtil';

type Props = ICryptocurrency & { baseSymbol: string; baseCode: string };

const numberPrecision = 7;
const locale = 'en-GB';
const dateFormat = 'DD MMMM, YYYY';

const priceChange = (history: number[]) => {
  const lastElement = history[history.length - 1];
  const lastButOneElement = history[history.length - 2];
  return lastElement - lastButOneElement;
};

const CryptocurrencyCard = (props: Props) => {
  const allTimeHighDate = dayjs(props.ath_date).format(dateFormat);

  // Calculate dominant color from image
  const [originalColor, setOriginalColor] = useState('white');

  useEffect(() => {
    console.log(props.name);

    const fun = async () => {
      const response = await ImageColors.getColors(
        'https://imgur.com/O3XSdU7',
        {
          fallback: '#228B22',
          cache: true,
          key: 'unique_key',
        }
      );
      console.log(response);
    };

    fun().catch((error) => console.log(error));
  }, []);

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
        color: () => 'red',
      },
    ],
  };

  const priceChangeIcon = () => {
    return priceChange(props.sparkline_in_7d.price) > 0 ? (
      <Feather name="trending-up" color="green" size={20} />
    ) : (
      <Feather name="trending-down" color="red" size={20} />
    );
  };

  const priceChangeText = () => {
    return priceChange(props.sparkline_in_7d.price) > 0 ? (
      <Text>
        {'+ '}
        {Number(priceChange(props.sparkline_in_7d.price)).toLocaleString(
          locale,
          {
            minimumFractionDigits: numberPrecision,
          }
        )}
        {' ' + props.baseSymbol}
      </Text>
    ) : (
      <Text>
        {'- '}
        {Number(
          Math.abs(priceChange(props.sparkline_in_7d.price))
        ).toLocaleString(locale, {
          minimumFractionDigits: numberPrecision,
        })}
        {' ' + props.baseSymbol}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardTop}>
        <Image
          style={styles.logo}
          source={{
            uri: props.image,
          }}
        />
        <View style={styles.baseData}>
          <Text>{props.name + ' (' + props.symbol.toUpperCase() + ')'}</Text>
          <Text>{'CoinGecko Rank' + ' #' + props.market_cap_rank}</Text>
          <Text>
            {props.current_price.toLocaleString(locale, {
              minimumFractionDigits: numberPrecision,
            }) +
              ' ' +
              props.baseSymbol}
          </Text>
          <Text>
            {'MAX: ' +
              props.ath.toLocaleString(locale, {
                minimumFractionDigits: numberPrecision,
              }) +
              ' ' +
              props.baseSymbol}
          </Text>
          <Text>
            {'(On ' +
              (allTimeHighDate.toString() !== 'Invalid Date'
                ? allTimeHighDate.toString()
                : '-') +
              ')'}
          </Text>
        </View>
      </View>
      <View style={styles.cardBottom}>
        {props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 1] &&
          props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 2] &&
          priceChangeIcon()}
        {props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 1] &&
        props.sparkline_in_7d.price[props.sparkline_in_7d.price.length - 2] ? (
          priceChangeText()
        ) : (
          <Text>No price data!</Text>
        )}
        <LineChart
          style={{ paddingRight: 0, margin: 0, shadowColor: 'green' }}
          data={data}
          height={80}
          width={150}
          chartConfig={{
            color: () => 'red',
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: '90%',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  cardTop: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    flex: 1,
    width: 110,
    height: 110,
    maxHeight: 110,
    maxWidth: 110,
  },
  baseData: {
    flex: 1,
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'row',
  },
  sparkline: {
    flex: 1,
  },
  priceChange: {
    flex: 1,
  },
});

export default CryptocurrencyCard;
