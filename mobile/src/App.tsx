import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React from 'react';
import NavigationDrawer from './components/NavigationDrawer';
import CryptocurrencyDetailsScreen from './screens/cryptocurrency/CryptocurrencyDetails';
import Profile from './screens/cryptocurrency/Profile';
import CryptocurrencyTabNavigation from './screens/CryptocurrencyTabNavigation';
import Home from './screens/Home';
import ReduxTest from './screens/ReduxTest';

export type StackParamList = {
  // Testing
  ReduxTest: { username: string };
  // Public
  Home: undefined;
  Profile: undefined;
  // Tab Navigation
  TabNavigation: { screen: string | undefined };
  // Tabs
  Summary: undefined;
  CryptocurrencyList: undefined;
  Wallet: undefined;
  TransactionHistory: undefined;
  // Details
  CryptocurrencyDetails: undefined;
};

const Drawer = createDrawerNavigator<StackParamList>();

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

const App = () => {
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

export default App;
