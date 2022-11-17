import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React from 'react';
import NavigationDrawer from '../../components/NavigationDrawer';
import CryptocurrencyDetailsScreen from '../../screens/cryptocurrency/CryptocurrencyDetails';
import Profile from '../../screens/cryptocurrency/Profile';
import CryptocurrencyTabNavigation from '../../screens/navigation/CryptocurrencyTabNavigation';
import Home from '../../screens/public/Home';
import ReduxTest from '../public/ReduxTest';

export type DrawerParamList = {
  ReduxTest: { username: string };
  Home: undefined;
  Profile: undefined;
  TabNavigation: { screen: string | undefined };
  Summary: undefined;
  CryptocurrencyList: undefined;
  Wallet: undefined;
  TransactionHistory: undefined;
  CryptocurrencyDetails: undefined;
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
      initialRouteName="Home"
      screenOptions={{ ...navigationOptions }}
      drawerContent={(props) => <NavigationDrawer {...props} />}
    >
      <Drawer.Screen
        name="ReduxTest"
        component={ReduxTest}
        options={{ title: 'Redux Test' }}
        initialParams={{ username: 'Guest' }}
      />
      <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
      <Drawer.Screen
        name="TabNavigation"
        component={CryptocurrencyTabNavigation}
        options={{ title: 'Cryptocurrencies' }}
      />
      <Drawer.Screen
        name="CryptocurrencyDetails"
        component={CryptocurrencyDetailsScreen}
        options={{ title: 'Cryptocurrency Details' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
