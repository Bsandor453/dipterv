import axios, { AxiosInstance } from 'axios';
import { default as dayjs } from 'dayjs';
import logging from '../config/Logging';
import config from '../config/MainConfig';
import IToken from '../interfaces/IToken';
import TokenService from '../service/RefreshTokenService';
import { readObject, readString } from './AsyncStorageUtils';

const interceptorDebug = config.interceptorDebug;
const dateFormat = 'YYYY.MM.DD. HH:mm:ss';

const AxiosWithInterceptors = (): AxiosInstance => {
  // Create a new axios instance
  const axiosInstance = axios.create();

  // Override default timeout of the axios instance
  // Now all requests using this instance will wait this much time before timing out
  axiosInstance.defaults.timeout = config.defaults.axiosTimeout;

  // Add a new request interceptor to the created axios instance
  // This interceptor intercepts all requests to check the access token
  // If the access token is expired, then it gets a new access token
  // The new token comes from the refresh token endpoint
  axiosInstance.interceptors.request.use(async (request) => {
    // Get the expiration data from the AsyncStorage
    const expiresAt = dayjs(await readString('token_expires_at'), dateFormat);
    const expiresAtUnix = expiresAt.unix();
    const now = dayjs();
    const differenceFromNowUnix = dayjs.unix(expiresAtUnix).diff(now);
    const isExpired = differenceFromNowUnix < 1;

    // Log the token expiration
    if (interceptorDebug) {
      logging.info(
        `⏰ Access token expired: ${isExpired} | Time left: ${
          differenceFromNowUnix / 1000.0
        } seconds`,
        'services/useAxios'
      );
    }

    // Get new access token if it's exprired
    const userJWT: IToken = await readObject('userJWT');
    if (isExpired) {
      TokenService.getRefreshToken(userJWT.refreshToken);
    }

    return request;
  });

  return axiosInstance;
};

export default AxiosWithInterceptors;
