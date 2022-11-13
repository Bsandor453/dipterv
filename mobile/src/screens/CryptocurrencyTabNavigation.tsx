import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
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
    switch (getFocusedRouteNameFromRoute(route)) {
      case 'Summary':
        return '#f9a825';
      case 'CryptocurrencyList':
        return '#fbc02d';
      case 'Wallet':
        return '#fdd835';
      case 'TransactionHistory':
        return '#ffeb3b';
      default:
        return '#f9a825';
    }
  };
  const [bgColor, setBgColor] = useState(tabColorOfScreen());

  return (
    <Tab.Navigator
      initialRouteName="Summary"
      barStyle={{ backgroundColor: tabColorOfScreen() }}
      shifting={true}
    >
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          tabBarLabel: 'Summary',
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CryptocurrencyTabNavigation;
