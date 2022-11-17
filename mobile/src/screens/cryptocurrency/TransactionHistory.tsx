import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { TabParamList } from '../navigation/CryptocurrencyTabNavigation';
import { DrawerParamList } from '../navigation/DrawerNavigation';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'TransactionHistory'>,
  DrawerScreenProps<DrawerParamList>
>;

const TransactionHistoryScreen = ({ route, navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Transaction History Screen</Text>
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

export default TransactionHistoryScreen;
