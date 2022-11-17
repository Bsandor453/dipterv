import { DrawerScreenProps } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AmberPalette } from '../../util/ColorPalette';
import CryptocurrencyListScreen from '../cryptocurrency/CryptocurrencyList';
import SummaryScreen from '../cryptocurrency/Summary';
import TransactionHistoryScreen from '../cryptocurrency/TransactionHistory';
import WalletScreen from '../cryptocurrency/Wallet';
import { DrawerParamList } from './DrawerNavigation';

export type TabParamList = {
  Summary: undefined;
  CryptocurrencyList: undefined;
  Wallet: undefined;
  TransactionHistory: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

type NavigationProps = DrawerScreenProps<DrawerParamList, 'TabNavigation'>;

const CryptocurrencyTabNavigation = ({
  route,
  navigation,
}: NavigationProps) => {
  const tabColorOfScreen = () => {
    switch (getFocusedRouteNameFromRoute(route)) {
      case 'Summary':
        return AmberPalette[0];
      case 'CryptocurrencyList':
        return AmberPalette[1];
      case 'Wallet':
        return AmberPalette[2];
      case 'TransactionHistory':
        return AmberPalette[3];
      default:
        return AmberPalette[0];
    }
  };

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
