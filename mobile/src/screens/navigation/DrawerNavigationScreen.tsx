import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React from 'react';
import NavigationDrawer from '../../components/NavigationDrawer';
import CryptocurrencyDetailsScreen from '../cryptocurrency/CryptocurrencyDetailsScreen';
import HomeScreen from '../public/HomeScreen';
import ProfileScreen from '../public/ProfileScreen';
import TestScreen from '../public/TestScreen';
import CryptocurrencyTabNavigationScreen from './TabNavigationScreen';

export type DrawerParamList = {
  Test: { username: string };
  Home: undefined;
  Profile: undefined;
  TabNavigation: { screen: string | undefined };
  Summary: undefined;
  CryptocurrencyList: undefined;
  Wallet: undefined;
  TransactionHistory: undefined;
  CryptocurrencyDetails: { coinId: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const navigationOptions: DrawerNavigationOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#ef6c00',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{ ...navigationOptions }}
      drawerContent={(props) => <NavigationDrawer {...props} />}
    >
      <Drawer.Screen
        name="TabNavigation"
        component={CryptocurrencyTabNavigationScreen}
        options={{ title: 'Cryptocurrencies' }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="Test"
        component={TestScreen}
        options={{ title: 'Test' }}
        initialParams={{ username: 'Guest' }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Drawer.Screen
        name="CryptocurrencyDetails"
        component={CryptocurrencyDetailsScreen}
        options={{ title: 'Cryptocurrency Details' }}
        initialParams={{ coinId: 'bitcoin' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
