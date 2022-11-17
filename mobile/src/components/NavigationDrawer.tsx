import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { Avatar, Divider, Drawer, Text, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';

const username = 'John Doe';
const role = 'User';

const NavigationDrawer = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ paddingLeft: 20 }}>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Avatar.Image
              source={require('../../assets/bitcoin.png')}
              size={50}
              style={{ backgroundColor: 'white' }}
            />
            <View
              style={{
                marginLeft: 15,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Title
                style={{
                  fontSize: 22,
                  fontWeight: '500',
                  justifyContent: 'center',
                }}
              >
                Stock simulator
              </Title>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ marginLeft: 0, flexDirection: 'column' }}>
              <Text>
                <Title style={{ display: 'flex', fontSize: 16 }}>
                  Logged in as{' '}
                </Title>
                <Title style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {username}
                </Title>
                <Title style={{ fontSize: 16 }}> ({role})</Title>
              </Text>
            </View>
          </View>
        </View>
        <Divider style={{ marginTop: 10 }} bold />
        <Drawer.Section title="Public" style={{ marginBottom: 0 }}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate('Profile');
            }}
          />
        </Drawer.Section>

        <Drawer.Section title="Cryptocurrencies" style={{ marginBottom: 0 }}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="receipt" color={color} size={size} />
            )}
            label="Summary"
            onPress={() => {
              props.navigation.navigate('TabNavigation', { screen: 'Summary' });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="bitcoin" color={color} size={size} />
            )}
            label="Browse & Trade"
            onPress={() => {
              props.navigation.navigate('TabNavigation', {
                screen: 'CryptocurrencyList',
              });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="wallet" color={color} size={size} />
            )}
            label="Wallet"
            onPress={() => {
              props.navigation.navigate('TabNavigation', {
                screen: 'Wallet',
              });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="history" color={color} size={size} />
            )}
            label="Transaction History"
            onPress={() => {
              props.navigation.navigate('TabNavigation', {
                screen: 'TransactionHistory',
              });
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section
        style={{
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1,
        }}
      >
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign out"
          onPress={() => {
            dispatch(logout());
          }}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
};

export default NavigationDrawer;
