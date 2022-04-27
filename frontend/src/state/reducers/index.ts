import { combineReducers } from 'redux';
import MessageReducer from './MessageReducer';
import authReducer from './AuthReducer';
import cryptoCurrencyReducer from './CryptocurrencyReducer';
import testReducer from './TestReducer';
import userReducer from './UserReducer';

const reducers = combineReducers({
  TEST: testReducer,
  AUTH: authReducer,
  USER: userReducer,
  MESSAGE: MessageReducer,
  CRYPTOCURRENCY: cryptoCurrencyReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
