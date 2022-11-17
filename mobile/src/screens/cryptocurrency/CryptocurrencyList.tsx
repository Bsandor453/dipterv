import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { TabParamList } from '../navigation/CryptocurrencyTabNavigation';
import { DrawerParamList } from '../navigation/DrawerNavigation';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'CryptocurrencyList'>,
  DrawerScreenProps<DrawerParamList>
>;

const CryptocurrencyListScreen = ({ route, navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Cryptocurrency List Screen</Text>
      <Button
        mode="outlined"
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate('CryptocurrencyDetails')}
      >
        Go to Coin details
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

export default CryptocurrencyListScreen;
