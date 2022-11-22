import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import config from '../../config/MainConfig';
import {
  depositMoney,
  getCryptocurrenciesInWallet,
  getWallet,
  resetMoney,
} from '../../redux/action_creators/cryptocurrency';
import { AppDispatch, RootState } from '../../redux/store';
import { TextColor } from '../../util/ColorPalette';
import { DrawerParamList } from '../navigation/DrawerNavigationScreen';
import { TabParamList } from '../navigation/TabNavigationScreen';
import { show } from '../../redux/slices/snackbarSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { setFloat } from '../../util/NumberUtilts';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Wallet'>,
  DrawerScreenProps<DrawerParamList>
>;

const baseCurrency = config.defaults.baseCurrency;

const WalletScreen = ({ route, navigation }: NavigationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState<number | ''>('');

  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.crypto);
  const wallet = coins.wallet;
  const coinsWallet = coins.coinsWallet;
  const depositStatus = coins._status.moneyDeposit;
  const resetStatus = coins._status.moneyReset;

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        dispatch(getWallet()),
        dispatch(getCryptocurrenciesInWallet()),
      ]);
    };
    loadData().then(() => setIsLoading(false));
  }, []);

  const interval = 20000;
  useInterval(() => {
    dispatch(getWallet());
    dispatch(getCryptocurrenciesInWallet());
  }, interval);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={50} color="black" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { marginTop: 0 }]}>
        Reference money {isLoading.toString()}
      </Text>
      <Text>
        <Text style={styles.text}>
          You can buy cryptocurrencies for the reference fiat money. The
          reference money is
        </Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>
          {' ' + baseCurrency.code}
          {` (${baseCurrency.symbol})`}
        </Text>
        <Text style={styles.text}>{'.'}</Text>
      </Text>
      <Text style={styles.bigText}>Your current wealth:</Text>
      <Text style={[styles.bigText, { color: 'green', fontWeight: 'bold' }]}>
        {(wallet?.referenceCurrency ?? 0).toFixed(3) +
          ' ' +
          baseCurrency.symbol}
      </Text>
      <Text style={styles.title}>Deposit or reset money</Text>
      <View style={styles.amount}>
        <Text style={[styles.text, { alignSelf: 'center' }]}>Amount:</Text>
        <TextInput
          style={styles.numberInput}
          placeholder="Amount"
          autoCapitalize="none"
          onChangeText={(v) => setFloat(v, setDepositAmount)}
          value={depositAmount.toString()}
          keyboardType="numeric"
          underlineColorAndroid={TextColor}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            depositMoney({ amount: depositAmount !== '' ? depositAmount : 0 })
          ).then(() => {
            if (depositStatus.slice(0, 7) === 'success') {
              setDepositAmount('');
              dispatch(
                show({
                  message: `Successfully deposited ${Number(
                    depositAmount
                  )}\u00A0${baseCurrency.symbol}!`,
                  type: 'success',
                })
              );
              dispatch(getWallet());
            }
          });
        }}
        disabled={depositAmount === ''}
      >
        <LinearGradient
          colors={
            depositAmount === '' ? ['#dedede', '#ededed'] : ['green', '#11b50e']
          }
          style={[styles.button, { marginRight: 100 }]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: depositAmount === '' ? 'gray' : 'white' },
            ]}
          >
            Deposit money
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(resetMoney()).then(() => {
            if (resetStatus.slice(0, 7) === 'success') {
              console.log('okay lets go');
              dispatch(
                show({
                  message: 'Successfully reset money!',
                  type: 'success',
                })
              );
              dispatch(getWallet());
            }
          });
        }}
        disabled={wallet?.referenceCurrency === 0}
      >
        <LinearGradient
          colors={
            wallet?.referenceCurrency === 0
              ? ['#dedede', '#ededed']
              : ['#961805', 'red']
          }
          style={[styles.button, { marginRight: 100 }]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: wallet?.referenceCurrency === 0 ? 'gray' : 'white' },
            ]}
          >
            Reset money
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.title}>Your cryptocurrencies {depositAmount}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  title: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 30,
    color: TextColor,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    color: TextColor,
  },
  bigText: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 22,
    color: TextColor,
  },
  button: {
    marginVertical: 10,
    borderRadius: 10,
    marginEnd: 10,
    padding: 5,
  },
  buttonText: {
    marginHorizontal: 10,
    fontWeight: '500',
    fontSize: 22,
    color: TextColor,
    alignSelf: 'center',
  },
  amount: {
    flexDirection: 'row',
    marginTop: 5,
    paddingBottom: 5,
  },
  numberInput: {
    flex: 1,
    paddingLeft: 10,
    color: TextColor,
    padding: 5,
    marginLeft: 10,
    marginRight: 100,
    tintColor: TextColor,
  },
});

export default WalletScreen;
