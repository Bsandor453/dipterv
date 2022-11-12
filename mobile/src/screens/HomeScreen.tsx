import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { StackParamList } from '../App';

type NavigationProps = NativeStackScreenProps<StackParamList, 'Home'>;

const HomeScreen = ({ route, navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Welcome, {route.params.userName}!</Text>
      <Button
        mode="outlined"
        style={{ marginTop: 50, color: 'blue' }}
        onPress={() => navigation.navigate('ReduxTest')}
      >
        Go to 'Redux Test' Screen
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

export default HomeScreen;
