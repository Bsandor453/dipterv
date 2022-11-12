import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decrement, incrementByAmount } from '../redux/slices/counterSlice';
import type { RootState } from '../redux/store';

const ReduxTest = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  bindActionCreators;
  const [active, setActive] = React.useState('');

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

export default ReduxTest;
