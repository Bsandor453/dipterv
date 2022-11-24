import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { DataTable, Dialog, Portal, Text } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import SummaryEntry from '../../components/SummaryEntry';
import {
  getCryptocurrenciesInTransactions,
  getSummary,
  getWallet,
} from '../../redux/action_creators/cryptocurrency';
import { AppDispatch, RootState } from '../../redux/store';
import { TextColor } from '../../util/ColorPalette';
import { DrawerParamList } from '../navigation/DrawerNavigationScreen';
import { TabParamList } from '../navigation/TabNavigationScreen';

type NavigationProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'TransactionHistory'>,
  DrawerScreenProps<DrawerParamList>
>;

const sortByProperties = [
  {
    id: 'profit',
    name: 'Profit',
  },
  {
    id: 'name',
    name: 'Name',
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

const SummaryScreen = ({ route, navigation }: NavigationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listIsLoading, setListIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.crypto);
  const summary = coins.summary;
  const wallet = coins.wallet;
  const coinsTransactions = coins.coinsTransactions;

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const elementCount =
    summary?.profitOnCryptocurrencyPage.elementCount ?? pageSize;
  const from = (page - 1) * pageSize;
  const to = Math.min(page * pageSize, elementCount);
  const [sortBy, setSortBy] = useState(sortByProperties[0].id);
  const [sortDirection, setSortDirection] = useState('desc');
  const asc = sortDirection === 'asc';

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        dispatch(
          getSummary({
            page: page,
            size: pageSize,
            sortBy: sortByProperties[0].id,
            asc: false,
          })
        ),
        dispatch(getCryptocurrenciesInTransactions()),
        dispatch(getWallet()),
      ]);
    };
    loadData().then(() => {
      setIsLoading(false);
      setListIsLoading(false);
    });
  }, []);

  const interval = 20000;
  useInterval(() => {
    dispatch(
      getSummary({
        page: page,
        size: pageSize,
        sortBy: sortBy,
        asc: false,
      })
    );
    dispatch(getCryptocurrenciesInTransactions());
    dispatch(getWallet());
  }, interval);

  const [sortDialogvisible, setSortDialogvisible] = useState(false);
  const hideSortDialog = () => setSortDialogvisible(false);

  const SortBySelect = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setSortDialogvisible(true)}
          style={styles.sortButton}
        >
          <MaterialIcons
            name="sort"
            color="grey"
            size={35}
            style={{ alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>
        <Portal>
          <Dialog
            visible={sortDialogvisible}
            onDismiss={hideSortDialog}
            style={styles.sortByDialog}
          >
            <Dialog.Title>Sort settings</Dialog.Title>
            <Dialog.Content>
              <SelectDropdown
                data={sortByProperties}
                onSelect={(selectedItem) => {
                  setSortBy(selectedItem.id);
                  setListIsLoading(true);
                  dispatch(
                    getSummary({
                      page: page,
                      size: pageSize,
                      sortBy: selectedItem.id,
                      asc: false,
                    })
                  ).then(() => {
                    setListIsLoading(false);
                  });
                }}
                defaultButtonText={'Select sort by'}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item) => {
                  return item.name;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#444'}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
              />
              <SelectDropdown
                data={sortByDirections}
                onSelect={(selectedItem) => {
                  setSortDirection(selectedItem.id);
                  setListIsLoading(true);
                  dispatch(
                    getSummary({
                      page: page,
                      size: pageSize,
                      sortBy: sortBy,
                      asc: selectedItem.id,
                    })
                  ).then(() => {
                    setListIsLoading(false);
                  });
                }}
                defaultButtonText={'Select sort direction'}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item) => {
                  return item.name;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#444'}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
              />
            </Dialog.Content>
          </Dialog>
        </Portal>
      </>
    );
  };

  const Pagination = () => (
    <View>
      <DataTable>
        <DataTable.Pagination
          style={{
            alignSelf: 'center',
          }}
          page={page - 1}
          numberOfPages={summary?.profitOnCryptocurrencyPage.pageCount ?? 1}
          onPageChange={async (p) => {
            setListIsLoading(true);
            await dispatch(
              getSummary({
                page: p + 1,
                size: pageSize,
                sortBy,
                asc: asc,
              })
            );
            setPage(p + 1);
            setListIsLoading(false);
          }}
          label={`${from + 1}-${to} of ${elementCount}`}
          showFastPaginationControls
          numberOfItemsPerPage={pageSize}
          onItemsPerPageChange={setPage}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  );

  const Loader = (size: number) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size={size} color="black" />
    </View>
  );

  if (isLoading) {
    return Loader(50);
  }

  return (
    <ScrollView style={styles.container}>
      {SortBySelect()}
      <View style={styles.pagination}>{Pagination()}</View>
      {summary?.profitOnCryptocurrencyPage.content.length !== 0 && (
        <View style={styles.transactionListHeader}>
          <Text
            style={{
              marginLeft: 58,
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Coin/Amount
          </Text>
          <Text
            style={{
              marginLeft: 25,
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Profit/Unit price
          </Text>
        </View>
      )}
      {!listIsLoading
        ? summary?.profitOnCryptocurrencyPage.content.length !== 0 &&
          summary?.profitOnCryptocurrencyPage.content.map(
            (summaryEntry, index) => {
              const cryptocurrency = coinsTransactions?.find(
                (coin) => coin.id === summaryEntry.id
              );
              const walletAmount =
                cryptocurrency &&
                wallet?.cryptocurrencies &&
                Object.entries(wallet?.cryptocurrencies).find(([key]) => {
                  return key === cryptocurrency.id;
                })?.[1];
              return (
                <SummaryEntry
                  {...summaryEntry}
                  key={index}
                  lastElementInList={!!(index === pageSize - 1)}
                  coinId={cryptocurrency ? cryptocurrency.id : null}
                  coinName={cryptocurrency ? cryptocurrency.name : null}
                  coinImage={cryptocurrency ? cryptocurrency.image : undefined}
                  coinPrice={
                    cryptocurrency ? cryptocurrency.current_price : undefined
                  }
                  amount={walletAmount}
                  color={cryptocurrency ? cryptocurrency.color : TextColor}
                />
              );
            }
          )
        : Loader(40)}
      <View style={[styles.pagination, { marginBottom: 30 }]}>
        {Pagination()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  transactionListHeader: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  sortButton: {
    width: 50,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 8,
    padding: 5,
    alignSelf: 'flex-end',
  },
  pagination: {},
  sortByDialog: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  dropdownBtnStyle: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#444',
    marginBottom: 15,
  },
  dropdownBtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdownDropdownStyle: {
    backgroundColor: '#EFEFEF',
    width: 250,
    borderRadius: 8,
  },
  dropdownRowStyle: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: { color: '#444', textAlign: 'left' },
});

export default SummaryScreen;
