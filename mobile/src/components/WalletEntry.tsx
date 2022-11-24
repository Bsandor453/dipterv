import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import ICryptocurrency from '../interfaces/cryptocurrency/ICryptocurrency';
import { TextColor } from '../util/ColorPalette';
import { calculateBrightness, LightenDarkenColor } from '../util/ColorUtil';
import { formatAmount, formatCurrency } from '../util/CurrencyUtils';

type Props = ICryptocurrency & {
  lastElementInList: boolean;
  amount: number;
};

const WalletEntry = (props: Props) => {
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
        { marginBottom: props.lastElementInList ? 50 : 5 },
      ]}
    >
      <TouchableRipple
        onPress={() => {
          navigation.navigate('CryptocurrencyDetails', { coinId: props.id });
        }}
        rippleColor="rgba(0, 0, 0, .1)"
        style={[styles.ripple]}
        borderless
      >
        <View style={styles.card}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={{
                uri: props.image,
              }}
            />
          </View>
          <View style={styles.coinName}>
            <Text style={styles.nameText}>{props.name}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={[styles.amount, { color: color }]}>
              {formatAmount(props.amount)}
            </Text>
            <Text style={styles.worth}>
              {formatCurrency(props.current_price * props.amount)}
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
    resizeMode: 'contain',
  },
  coinName: {
    flex: 4,
  },
  nameText: {
    fontWeight: '700',
    marginLeft: 10,
    fontSize: 18,
    color: TextColor,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: TextColor,
  },
  worth: {
    fontWeight: '600',
    fontSize: 18,
    color: TextColor,
  },
});

export default React.memo(WalletEntry);
