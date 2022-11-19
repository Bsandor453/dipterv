import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DataTable, Dialog, Portal } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import CryptocurrencyCard from '../../components/CryptocurrencyCard';
import getCryptocurrencies from '../../redux/action_creators/cryptocurrency';
import { AppDispatch, RootState } from '../../redux/store';
import { TextColor } from '../../util/ColorPalette';
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

const CryptocurrencyListScreen = ({ route, navigation }: NavigationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: RootState) => state.crypto.coins);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const elementCount = coins?.elementCount ?? pageSize;
  const from = (page - 1) * pageSize;
  const to = Math.min(page * pageSize, elementCount);

  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(sortByProperties[0].id);
  const [sortDirection, setSortDirection] = useState('desc');
  const asc = sortDirection === 'asc';

  const [sortDialogvisible, setSortDialogvisible] = useState(false);
  const hideSortDialog = () => setSortDialogvisible(false);

  useEffect(() => {
    dispatch(
      getCryptocurrencies({
        page: 1,
        size: pageSize,
        sortBy: sortByProperties[0].id,
        asc: false,
        search: '',
      })
    );
  }, []);

  const SortBySelect = () => {
    return (
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
              onSelect={(selectedItem, index) => {
                setSortBy(selectedItem.id);
                dispatch(
                  getCryptocurrencies({
                    page,
                    size: pageSize,
                    sortBy: selectedItem.id,
                    asc: asc,
                    search: searchText,
                  })
                );
              }}
              defaultButtonText={'Select sort by'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
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
              onSelect={(selectedItem, index) => {
                setSortDirection(selectedItem.id);
                dispatch(
                  getCryptocurrencies({
                    page,
                    size: pageSize,
                    sortBy,
                    asc: selectedItem.id === 'asc',
                    search: searchText,
                  })
                );
              }}
              defaultButtonText={'Select sort direction'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
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
    );
  };

  const SearchInput = () => (
    <View style={styles.filters}>
      <View style={styles.search}>
        <MaterialIcons
          name="search"
          color={TextColor}
          size={20}
          style={{ marginStart: 10, marginTop: 7 }}
        />
        <TextInput
          placeholder="Search by name..."
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => setSearchText(value)}
          onSubmitEditing={() => {
            dispatch(
              getCryptocurrencies({
                page,
                size: pageSize,
                sortBy,
                asc: asc,
                search: searchText,
              })
            );
          }}
        />
      </View>
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
    </View>
  );

  const Pagination = () => (
    <View>
      <DataTable>
        <DataTable.Pagination
          page={page - 1}
          numberOfPages={coins?.pageCount ?? 1}
          onPageChange={async (p) => {
            await dispatch(
              getCryptocurrencies({
                page: p + 1,
                size: pageSize,
                sortBy,
                asc: asc,
                search: searchText,
              })
            );
            setPage(p + 1);
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      {SearchInput()}
      {SortBySelect()}
      {coins?.content.length !== 0 && (
        <>
          <View style={styles.pagination}>{Pagination()}</View>
          {coins?.content?.map((coin, index) => (
            <CryptocurrencyCard
              key={coin.id}
              {...coin}
              lastElementInList={!!(index === pageSize - 1)}
            />
          ))}
          <View style={styles.pagination}>{Pagination()}</View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filters: {
    flexDirection: 'row',
  },
  search: {
    width: '72%',
    flexDirection: 'row',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 8,
    padding: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: TextColor,
  },
  sortButton: {
    marginTop: 15,
    marginStart: 15,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 8,
    padding: 5,
  },
  pagination: {
    marginVertical: 0,
  },
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
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

export default CryptocurrencyListScreen;
