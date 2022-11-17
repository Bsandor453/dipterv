import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DrawerParamList } from '../navigation/DrawerNavigation';

type NavigationProps = DrawerScreenProps<DrawerParamList, 'Home'>;

const HomeScreen = ({ navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        mode="outlined"
        style={{ marginTop: 50 }}
        onPress={() =>
          navigation.navigate('TabNavigation', { screen: 'Summary' })
        }
      >
        Go to Summary
      </Button>
      <Button
        mode="outlined"
        style={{ marginTop: 5 }}
        onPress={() =>
          navigation.navigate('TabNavigation', { screen: 'CryptocurrencyList' })
        }
      >
        Go to Browse & Trade
      </Button>
      <Button
        mode="outlined"
        style={{ marginTop: 5 }}
        onPress={() =>
          navigation.navigate('TabNavigation', { screen: 'Wallet' })
        }
      >
        Go to Wallet
      </Button>
      <Button
        mode="outlined"
        style={{ marginTop: 5 }}
        onPress={() =>
          navigation.navigate('TabNavigation', { screen: 'TransactionHistory' })
        }
      >
        Go to Transaction History
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
