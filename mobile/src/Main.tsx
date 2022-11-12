import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import expoConfig from '../app.json';
import App from './App';
import { store } from './redux/store';

export default function Main() {
  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </StoreProvider>
    </NavigationContainer>
  );
}

registerRootComponent(Main);
AppRegistry.registerComponent(expoConfig.expo.name, () => Main);
