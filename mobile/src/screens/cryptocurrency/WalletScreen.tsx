import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { TabParamList } from '../navigation/TabNavigationScreen';
import { DrawerParamList } from '../navigation/DrawerNavigationScreen';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Wallet'>,
  DrawerScreenProps<DrawerParamList>
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
