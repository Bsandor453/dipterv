import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, incrementByAmount } from '../../redux/slices/counterSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { DrawerParamList } from '../navigation/DrawerNavigation';

type NavigationProps = DrawerScreenProps<DrawerParamList, 'ReduxTest'>;

const ReduxTestScreen = ({ route, navigation }: NavigationProps) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  const [active, setActive] = React.useState('');

  return (
    <View style={styles.container}>
      <Text variant="displayMedium">Redux test</Text>
      <Text>Welcome, {route.params.username}!</Text>
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
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate('Home')}
      >
        Go to Home
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

export default ReduxTestScreen;
