import * as React from 'react';
import { AppRegistry, Text } from 'react-native';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import expoConfig from '../app.json';
import App from './App';
import { store } from './redux/store';

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

registerRootComponent(Main);
AppRegistry.registerComponent(expoConfig.expo.name, () => Main);
