import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { TabParamList } from '../navigation/TabNavigationScreen';
import { DrawerParamList } from '../navigation/DrawerNavigationScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import {
  getWallet,
  getCryptocurrenciesInWallet,
  getTransactionHistory,
  getCryptocurrenciesInTransactions,
} from '../../redux/action_creators/cryptocurrency';
import { AppDispatch, RootState } from '../../redux/store';
import TransactionHistoryEntry from '../../components/TransactionHistoryEntry';
import { TextColor } from '../../util/ColorPalette';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'TransactionHistory'>,
  DrawerScreenProps<DrawerParamList>
>;

const sortByProperties = [
  {
    id: 'date',
    name: 'Date',
  },
  {
    id: 'type',
    name: 'Type price',
  },
  {
    id: 'cryptocurrencyId',
    name: 'Cryptocurrency',
  },
  {
    id: 'amount',
    name: 'Amount',
  },
  {
    id: 'price',
    name: 'Price',
  },
];

const sortByDirections = [
  {
    id: 'desc',
    name: 'Descending',
  },
  {
    id: 'asc',
    name: 'Ascending',
  },
];

const TransactionHistoryScreen = ({ route, navigation }: NavigationProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.crypto);
  const transactions = coins.transactions;
  const coinsTransactions = coins.coinsTransactions;

  const [page, setPage] = useState(4);
  const pageSize = 10;
  const elementCount = transactions?.elementCount ?? pageSize;
  const from = (page - 1) * pageSize;
  const to = Math.min(page * pageSize, elementCount);
  const [sortBy, setSortBy] = useState(sortByProperties[0].id);
  const [sortDirection, setSortDirection] = useState('asc');
  const asc = sortDirection === 'asc';

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        dispatch(
          getTransactionHistory({
            page: 1,
            size: pageSize,
            sortBy: sortByProperties[0].id,
            asc: false,
          })
        ),
        dispatch(getCryptocurrenciesInTransactions()),
      ]);
    };
    loadData().then(() => setIsLoading(false));
  }, []);

  const interval = 20000;
  useInterval(() => {
    dispatch(
      getTransactionHistory({
        page: page,
        size: pageSize,
        sortBy: sortByProperties[0].id,
        asc: false,
      })
    ),
      dispatch(getCryptocurrenciesInTransactions());
  }, interval);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={50} color="black" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {transactions?.content?.length !== 0 && (
        <View style={styles.transactionListHeader}>
          <Text
            style={{
              marginLeft: 58,
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Type/Date
          </Text>
          <Text
            style={{
              marginLeft: 25,
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Amount/Price
          </Text>
        </View>
      )}
      {transactions?.content?.length !== 0 &&
        transactions?.content.map((transaction, index) => {
          const cryptocurrency = coinsTransactions?.find(
            (coin) => coin.id === transaction.cryptocurrencyId
          );
          return (
            <TransactionHistoryEntry
              {...transaction}
              key={transaction.date}
              lastElementInList={!!(index === pageSize - 1)}
              coinId={cryptocurrency ? cryptocurrency.id : null}
              coinName={cryptocurrency ? cryptocurrency.name : null}
              coinImage={cryptocurrency ? cryptocurrency.image : null}
              color={cryptocurrency ? cryptocurrency.color : TextColor}
            />
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  transactionListHeader: {
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default TransactionHistoryScreen;
