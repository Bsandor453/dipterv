import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ReduxTestScreen from './screens/ReduxTestScreen';

export type StackParamList = {
  Home: { userName: string };
  ReduxTest: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
        initialParams={{ userName: 'Guest' }}
      />
      <Stack.Screen
        name="ReduxTest"
        component={ReduxTestScreen}
        options={{ title: 'Redux Test' }}
      />
    </Stack.Navigator>
  );
};

export default App;
