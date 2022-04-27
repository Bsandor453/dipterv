import { default as dayjs } from 'dayjs';
import TokenService from '../services/RefreshTokenService';
import axios, { AxiosInstance } from 'axios';
import config from '../config/Config';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import logging from '../config/Logging';

const interceptorDebug = config.interceptorDebug;
const dateFormat = 'YYYY.MM.DD. HH:mm:ss';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
  dayjs.extend(customParseFormat);
  const expiresAtString = localStorage.getItem('token_expires_at') || '{}';
  const expiresAt = dayjs(expiresAtString, dateFormat).unix();
  const isExpired = dayjs.unix(expiresAt).diff(dayjs()) < 1;
  const tokenString = localStorage.getItem('user') || '{}';
  const token = JSON.parse(tokenString);
  if (interceptorDebug) {
    logging.info(
      '⏰ Access token expired: ' +
        isExpired +
        ' | Time left: ' +
        dayjs.unix(expiresAt).diff(dayjs()) / 1000.0 +
        ' seconds',
      'services/useAxios'
    );
  }
  if (isExpired && token !== {} && token.refreshToken) {
    TokenService.getRefreshToken(token.refreshToken);
  }

  return request;
});

const useAxios = (): AxiosInstance => {
  return axiosInstance;
};

export default useAxios;
