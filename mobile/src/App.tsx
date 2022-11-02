import React from 'react';
import type { RootState } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
} from './redux/slices/counterSlice';
import { Button, Text } from 'react-native-paper';
import { StyleSheet, View, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { bindActionCreators } from 'redux';

const App = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  bindActionCreators;

  return (
    <View style={styles.container}>
      <Text variant="displayMedium">Redux test</Text>
      <Button
        mode="contained"
        onPress={() => {
          dispatch(incrementByAmount(10));
        }}
      >
        Increment (+)
      </Button>
      <Text variant="displayMedium">{count}</Text>
      <Button
        mode="contained"
        onPress={() => {
          dispatch(decrement());
        }}
      >
        Decrement (-)
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
