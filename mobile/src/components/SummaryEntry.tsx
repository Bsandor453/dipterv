import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { default as dayjs } from 'dayjs';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import config from '../config/MainConfig';
import IProfit from '../interfaces/IProfit';
import { TextColor } from '../util/ColorPalette';
import { calculateBrightness, LightenDarkenColor } from '../util/ColorUtil';
import { formatAmount, formatCurrency } from '../util/CurrencyUtils';

type Props = IProfit & {
  lastElementInList: boolean;
  coinId: string | null;
  coinName: string | null;
  coinImage: string | undefined;
  coinPrice: number | undefined;
  amount: number | undefined;
  color: string;
};

const baseCurrency = config.defaults.baseCurrency;
const dateFormat = 'D MMM, YYYY ' + 'HH:mm:ss';

const calculateProfitColor = (profit: number) => {
  if (profit === 0) {
    return TextColor;
  }
  if (profit > 0) {
    return 'green';
  }
  if (profit < 0) {
    return 'red';
  }
};

const SummaryEntry = (props: Props) => {
  const originalColor = props.color;
  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  return (
    <View
      style={[
        styles.container,
        { marginBottom: props.lastElementInList ? 10 : 5 },
      ]}
    >
      <TouchableRipple
        onPress={() => {
          props.coinId &&
            navigation.navigate('CryptocurrencyDetails', {
              coinId: props.coinId,
            });
        }}
        rippleColor="rgba(0, 0, 0, .1)"
        style={[styles.ripple]}
        borderless
      >
        <View style={styles.card}>
          <View style={styles.logoView}>
            <Image
              // Ignore typescript error, since image resize doesn't work with require()
              // @ts-ignore
              style={styles.logo}
              source={{ uri: props.coinImage }}
            />
          </View>
          <View style={styles.coinNameAndAmount}>
            <Text style={{ marginLeft: 10 }}>
              <Text style={styles.actionText}>
                {props.coinName ? props.coinName : null}
              </Text>
            </Text>
            <Text
              style={[
                styles.amount,
                { marginLeft: 10, color: color ?? TextColor },
              ]}
            >
              {props.amount ? formatAmount(props.amount) : '?'}
            </Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={[
                styles.profit,
                { color: calculateProfitColor(props.profit) },
              ]}
            >
              {`${formatAmount(props.profit)} ${baseCurrency.symbol}`}
            </Text>
            <Text style={styles.price}>
              {props.coinPrice ? formatCurrency(props.coinPrice) : '?'}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 0.3,
    borderColor: '#e6e3e3',
    elevation: 2,
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
  ripple: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoView: {
    flex: 1,
  },
  logo: {
    flex: 1,
    // Ignore typescript error, since image resize doesn't work with require()
    // @ts-ignore
    height: null,
    // Ignore typescript error, since image resize doesn't work with require()
    // @ts-ignore
    width: null,
    resizeMode: 'contain',
  },
  coinNameAndAmount: {
    flex: 4,
  },
  actionText: {
    fontWeight: '700',
    fontSize: 18,
    color: TextColor,
  },
  amount: {
    fontSize: 18,
    color: TextColor,
    fontWeight: 'bold',
  },
  profit: {
    fontWeight: 'bold',
    fontSize: 17,
    color: TextColor,
  },
  price: {
    fontWeight: '600',
    fontSize: 17,
    color: TextColor,
  },
});

export default React.memo(SummaryEntry);
