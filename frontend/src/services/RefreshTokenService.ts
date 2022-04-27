import { default as dayjs } from 'dayjs';
import IToken from '../interfaces/IToken';
import axios from 'axios';
import config from '../config/Config';

const dateFormat = 'YYYY.MM.DD. HH:mm:ss';

const storeDataInLocalStorage = (data: IToken): void => {
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token_valid_since', JSON.stringify(dayjs().format(dateFormat)));
  localStorage.setItem(
    'token_expires_at',
    JSON.stringify(
      dayjs()
        .add(data.expiresInSeconds ?? 3600, 'second')
        .format(dateFormat)
    )
  );
};

const getRefreshToken = (refreshToken: string): Promise<any> => {
  return axios.post(config.urls.auth.refreshToken, { refreshToken }).then(
    (response) => {
      storeDataInLocalStorage(response.data);
      return Promise.resolve(response.data);
    },
    () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token_expires_at');
      localStorage.removeItem('token_valid_since');
      window.location.reload();
    }
  );
};

export default {
  getRefreshToken,
  storeDataInLocalStorage,
};
