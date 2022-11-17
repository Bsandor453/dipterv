import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DrawerParamList } from '../navigation/DrawerNavigationScreen';

type NavigationProps = DrawerScreenProps<
  DrawerParamList,
  'CryptocurrencyDetails'
>;

const CryptocurrencyDetailsScreen = ({
  route,
  navigation,
}: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Cryptocurrency Details Screen</Text>
      <Text>.</Text>
      <Text>.</Text>
      <Text>.</Text>
      <Text>Details</Text>
      <Text>Details</Text>
      <Text>Details</Text>
      <Text>Details</Text>
      <Text>Details</Text>
      <Text>Details</Text>
      <Text>.</Text>
      <Text>.</Text>
      <Text>.</Text>
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

export default CryptocurrencyDetailsScreen;
