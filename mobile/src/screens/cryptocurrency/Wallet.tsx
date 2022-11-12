import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, ParamListBase } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { StackParamList } from '../../App';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<ParamListBase, 'Wallet'>,
  NativeStackScreenProps<StackParamList>
>;

const WalletScreen = ({ route, navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Wallet Screen</Text>
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

export default WalletScreen;
