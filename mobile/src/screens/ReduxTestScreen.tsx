import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StackParamList } from '../App';
import { decrement, incrementByAmount } from '../redux/slices/counterSlice';
import type { RootState } from '../redux/store';

type NavigationProps = NativeStackScreenProps<StackParamList, 'ReduxTest'>;

const ReduxTest = ({ route, navigation }: NavigationProps) => {
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
      <Button
        mode="outlined"
        style={{ marginTop: 50, color: 'blue' }}
        onPress={() => navigation.navigate('Home', { userName: 'Guest' })}
      >
        Go to 'Home' Screen
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
