import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ReduxTestScreen from './screens/ReduxTestScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="ReduxTest">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ReduxTest" component={ReduxTestScreen} />
    </Stack.Navigator>
  );
};

export default App;
