import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackParamList } from '../App';
import CryptocurrencyListScreen from './cryptocurrency/CryptocurrencyList';
import SummaryScreen from './cryptocurrency/Summary';
import TransactionHistoryScreen from './cryptocurrency/TransactionHistory';
import WalletScreen from './cryptocurrency/Wallet';

export type TabParamList = {
  Summary: undefined;
  CryptocurrencyList: undefined;
  Wallet: undefined;
  TransactionHistory: undefined;
};

const Tab = createMaterialBottomTabNavigator();

type NavigationProps = NativeStackScreenProps<StackParamList, 'TabNavigation'>;

const CryptocurrencyTabNavigation = ({
  route,
  navigation,
}: NavigationProps) => {
  const tabColorOfScreen = () => {
    console.log(route.params.screen);
    switch (route.params.screen) {
      case 'Summary':
        return '#ff6f00';
      case 'CryptocurrencyList':
        return '#f9a825';
      case 'Wallet':
        return '#ffa000';
      case 'TransactionHistory':
        return '#fdd835';
      default:
        return '#ff6f00';
    }
  };
  const [bgColor, setBgColor] = useState(tabColorOfScreen());

  return (
    <Tab.Navigator
      initialRouteName="Summary"
      shifting={true}
      barStyle={{ backgroundColor: bgColor }}
    >
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          tabBarLabel: 'Summary',
          tabBarColor: '#ff6f00',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="receipt" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CryptocurrencyList"
        component={CryptocurrencyListScreen}
        options={{
          tabBarLabel: 'Browse & Trade',
          tabBarColor: '#f9a825',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bitcoin" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarColor: '#ffa000',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{
          tabBarLabel: 'Transaction History',
          tabBarColor: '#fdd835',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CryptocurrencyTabNavigation;
