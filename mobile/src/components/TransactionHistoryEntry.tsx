import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { default as dayjs } from 'dayjs';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import config from '../config/MainConfig';
import ITransaction from '../interfaces/ITransaction';
import { TextColor } from '../util/ColorPalette';
import { calculateBrightness, LightenDarkenColor } from '../util/ColorUtil';
import { formatAmount, formatCurrency } from '../util/CurrencyUtils';

type Props = ITransaction & {
  lastElementInList: boolean;
  amount: number;
  coinId: string | null;
  coinName: string | null;
  coinImage: string | null;
  color: string;
};

const baseCurrency = config.defaults.baseCurrency;
const dateFormat = 'D MMM, YYYY ' + 'HH:mm:ss';

const mapActionName = (type: string) => {
  switch (type) {
    case 'BUY_CRYPTOCURRENCY':
      return 'Buy';
    case 'SELL_CRYPTOCURRENCY':
      return 'Sell';
    case 'DEPOSIT_MONEY':
      return 'Money deposit';
    case 'RESET_MONEY':
      return 'Money reset';
  }
};

const TransactionHistoryEntry = (props: Props) => {
  const originalColor = props.color;
  const brightness = calculateBrightness(originalColor ?? '#000000');
  const color =
    brightness > 160
      ? LightenDarkenColor(originalColor ?? '#000000', 160 - brightness)
      : originalColor;

  const navigation = useNavigation<BottomTabNavigationProp<any>>();

  const date = dayjs(props.date).format(dateFormat);

  return (
    <View
      style={[
        styles.container,
        { marginBottom: props.lastElementInList ? 50 : 5 },
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
              source={
                props.coinImage
                  ? {
                      uri: props.coinImage,
                    }
                  : props.type === 'DEPOSIT_MONEY'
                  ? require('../../assets/dollar-green.png')
                  : require('../../assets/dollar-red.png')
              }
            />
          </View>
          <View style={styles.coinNameAndDate}>
            <Text style={{ marginLeft: 10 }}>
              <Text style={styles.actionText}>{mapActionName(props.type)}</Text>
              <Text style={styles.actionText}>
                {props.coinName ? ' ' + props.coinName : null}
              </Text>
            </Text>
            <Text style={[styles.dateText, { marginLeft: 10 }]}>{date}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={[styles.amount, { color: color }]}>
              {props.type === 'DEPOSIT_MONEY'
                ? formatAmount(props.amount) + ` ${baseCurrency.symbol}`
                : props.type === 'RESET_MONEY'
                ? '-'
                : formatAmount(props.amount)}
            </Text>
            <Text style={styles.worth}>
              {!props.type.endsWith('MONEY')
                ? formatCurrency(props.price * props.amount)
                : null}
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
  coinNameAndDate: {
    flex: 4,
  },
  actionText: {
    fontWeight: '700',
    fontSize: 18,
    color: TextColor,
  },
  dateText: {
    fontSize: 12,
    color: TextColor,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 17,
    color: TextColor,
  },
  worth: {
    fontWeight: '600',
    fontSize: 17,
    color: TextColor,
  },
});

export default TransactionHistoryEntry;
