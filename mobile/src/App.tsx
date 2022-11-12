import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ReduxTestScreen from './screens/ReduxTestScreen';

export type StackParamList = {
  Home: { userName: string };
  ReduxTest: undefined;
};

const Drawer = createDrawerNavigator<StackParamList>();

const navigationOptions: DrawerNavigationOptions = {
  headerShown: true,
};

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ ...navigationOptions }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
        initialParams={{ userName: 'Guest' }}
      />
      <Drawer.Screen
        name="ReduxTest"
        component={ReduxTestScreen}
        options={{ title: 'Redux Test' }}
      />
    </Drawer.Navigator>
  );
};

export default App;
