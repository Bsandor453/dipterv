import AsyncStorage from '@react-native-async-storage/async-storage';
import logging from '../config/Logging';
import IToken from '../interfaces/IToken';
import { default as dayjs } from 'dayjs';

export const asyncStorageDateFormat = 'YYYY.MM.DD. HH:mm:ss';

const storeString = async (value: string, key: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    logging.error(e);
  }
};

const storeObject = async (value: any, key: string): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    logging.error(e);
  }
};

const readString = async (key: string): Promise<string | null | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ?? null;
  } catch (e) {
    logging.error(e);
  }
};

const readObject = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    logging.error(e);
  }
};

const removeItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

const storeJwtInAsyncStorage = (userJWT: IToken): void => {
  storeObject(userJWT, 'userJWT');
  storeObject(dayjs().format(asyncStorageDateFormat), 'token_valid_since');
  storeObject(
    dayjs()
      .add(userJWT.expiresInSeconds, 'second')
      .format(asyncStorageDateFormat),
    'token_expires_at'
  );
};

export {
  storeString,
  storeObject,
  readString,
  readObject,
  removeItem,
  storeJwtInAsyncStorage,
};
