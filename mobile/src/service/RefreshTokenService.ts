import axios from 'axios';
import config from '../config/MainConfig';
import { removeItem, storeJwtInAsyncStorage } from '../util/AsyncStorageUtils';

const getRefreshToken = (refreshToken: string): Promise<any> => {
  return axios.post(config.urls.auth.refreshToken, { refreshToken }).then(
    (response) => {
      storeJwtInAsyncStorage(response.data);
      return Promise.resolve(response.data);
    },
    () => {
      // TODO: Dispatch logout instead
      removeItem('userJWT');
      removeItem('token_expires_at');
      removeItem('token_valid_since');
    }
  );
};

export default {
  getRefreshToken,
  storeJwtInAsyncStorage,
};
