import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import config from './config/MainConfig';
import { hide } from './redux/slices/snackbarSlice';
import { AmberPalette, TextColor } from './util/ColorPalette';
import { AppDispatch, RootState } from './redux/store';
import DrawerNavigation from './screens/navigation/DrawerNavigation';
import RootStackScreen from './screens/navigation/RootStackScreen';

const getSnackbarColor = (type: 'info' | 'success' | 'error') => {
  switch (type) {
    case 'info':
      return 'white';
    case 'success':
      return '#4bf542';
    case 'error':
      return 'red';
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const snackbar = useSelector((state: RootState) => state.snackbar);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {isLoggedIn ? <DrawerNavigation /> : <RootStackScreen />}
      <Snackbar
        theme={{
          colors: {
            inversePrimary: 'white',
            surface: getSnackbarColor(snackbar.type),
          },
        }}
        visible={snackbar.visible}
        duration={config.defaults.snackbarDuration}
        onDismiss={() => dispatch(hide())}
        action={{
          label: 'Dismiss',
          onPress: () => {
            dispatch(hide());
          },
        }}
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
};

export default App;
