import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ICryptocurrency from '../../interfaces/cryptocurrency/ICryptocurrency';
import IPageable from '../../interfaces/IPageable';
import getCryptocurrencies from '../../redux/action_creators/cryptocurrency';
import { AppDispatch, RootState } from '../../redux/store';
import { DrawerParamList } from '../navigation/DrawerNavigationScreen';
import { TabParamList } from '../navigation/TabNavigationScreen';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'CryptocurrencyList'>,
  DrawerScreenProps<DrawerParamList>
>;

const sortByProperties = [
  {
    id: 'marketCap',
    name: 'Market capitalization',
  },
  {
    id: 'currentPrice',
    name: 'Current price',
  },
  {
    id: 'priceChange24h',
    name: 'Price change in 24 hours',
  },
];

const CryptocurrencyListScreen = ({ route, navigation }: NavigationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector(
    (state: RootState) => state.crypto.coins as IPageable<ICryptocurrency>
  );

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(sortByProperties[0].id);
  const [sortDirection, setSortDirection] = useState('desc');
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState(search);
  const asc = sortDirection === 'asc';
  const pageSize = 10;

  useEffect(() => {
    dispatch(
      getCryptocurrencies({ page, size: pageSize, sortBy, asc, search })
    );
  }, []);

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
      <>
        {coins?.content?.map((coin) => (
          <Text>{coin.name + ' --- ' + coin.current_price}</Text>
        ))}
      </>
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