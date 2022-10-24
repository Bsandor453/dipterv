import { ActionType } from '../action-types';
import {
  AuthAction,
  CryptocurrencyAction,
  MessageAction,
  TestAction,
  UserAction,
} from '../actions';
import { Dispatch } from 'redux';
import { VariantType } from 'notistack';
import AuthService from '../../services/AuthService';
import CryptocurrencyService from '../../services/CryptocurrenciesService';
import IMessage from '../../interfaces/IMessage';
import IPropertyUpdate from '../../interfaces/IPropertyUpdate';
import IUser from '../../interfaces/IUser';
import RefreshTokenService from '../../services/RefreshTokenService';
import UserService from '../../services/UserService';

// Testing

export const depositMoneyTest = (amount: number) => {
  return (dispatch: Dispatch<TestAction>): void => {
    dispatch({
      type: ActionType.DEPOSIT,
      payload: amount,
    });
  };
};

export const withdrawMoneyTest = (amount: number) => {
  return (dispatch: Dispatch<TestAction>): void => {
    dispatch({
      type: ActionType.WITHDRAW,
      payload: amount,
    });
  };
};

export const bankruptTest = () => {
  return (dispatch: Dispatch<TestAction>): void => {
    dispatch({
      type: ActionType.BANKRUPT,
    });
  };
};

// Message

export const setRegisterMessage = (message: IMessage) => {
  return (dispatch: Dispatch<MessageAction>): void => {
    dispatch({
      type: ActionType.SET_INFO_MESSAGE,
      payload: message,
    });
  };
};

export const setLoginMessage = (message: IMessage) => {
  return (dispatch: Dispatch<MessageAction>): void => {
    dispatch({
      type: ActionType.SET_INFO_MESSAGE,
      payload: message,
    });
  };
};

export const setInfoMessage = (message: IMessage) => {
  return (dispatch: Dispatch<MessageAction>): void => {
    dispatch({
      type: ActionType.SET_INFO_MESSAGE,
      payload: message,
    });
  };
};

// Authentication

export const register = (user: IUser) => {
  return (dispatch: Dispatch<AuthAction | MessageAction>): Promise<void> => {
    return AuthService.register(user).then(
      (response) => {
        dispatch({
          type: ActionType.REGISTER,
          payload: response.data,
        });

        dispatch({
          type: ActionType.SET_REGISTER_MESSAGE,
          payload: { text: 'Registration successful', type: 'success' as VariantType },
        });

        return Promise.resolve();
      },
      (error) => {
        const serverErrorMessage = error.response?.data?.message;
        let errorMessage = 'Registration failed.';
        if (!error.response) {
          errorMessage = 'Server is unavailable';
        }
        if (
          serverErrorMessage === 'Username is already taken!' ||
          serverErrorMessage === 'Email is already in use!'
        ) {
          errorMessage = serverErrorMessage;
        }
        errorMessage &&
          dispatch({
            type: ActionType.SET_REGISTER_MESSAGE,
            payload: { text: errorMessage, type: 'error' as VariantType },
          });
      }
    );
  };
};

export const login = (username: string, password: string) => {
  return (dispatch: Dispatch<AuthAction | MessageAction>): Promise<void> => {
    return AuthService.login(username, password).then(
      (response) => {
        if (response.data.accessToken) {
          const user = response.data;
          RefreshTokenService.storeDataInLocalStorage(user);
        }

        dispatch({
          type: ActionType.LOGIN,
          payload: response.data,
        });

        return Promise.resolve();
      },
      (error) => {
        const serverErrorMessage = error.response?.data?.message;
        let errorMessage = 'Sign in failed.';
        if (!error.response) {
          errorMessage = 'Server is unavailable';
        }
        if (serverErrorMessage === 'Bad credentials') {
          errorMessage = 'Wrong username or password!';
        }
        errorMessage &&
          dispatch({
            type: ActionType.SET_LOGIN_MESSAGE,
            payload: { text: errorMessage, type: 'error' as VariantType },
          });
      }
    );
  };
};

export const logout = () => {
  return (dispatch: Dispatch<AuthAction>): void => {
    AuthService.logout();
    dispatch({
      type: ActionType.LOGOUT,
    });
  };
};

// User Data

export const getUserData = () => {
  return (dispatch: Dispatch<UserAction>): Promise<void> => {
    return UserService.getUserData().then((response) => {
      dispatch({
        type: ActionType.GET_USER_DATA,
        payload: response.data,
      });

      return Promise.resolve();
    });
  };
};

export const clearUserData = () => {
  return (dispatch: Dispatch<UserAction>): void => {
    dispatch({
      type: ActionType.CLEAR_USER_DATA,
    });
  };
};

export const editUserData = (editedProperty: IPropertyUpdate) => {
  return (dispatch: Dispatch<UserAction>): void => {
    dispatch({
      type: ActionType.EDIT_USER_DATA,
      payload: editedProperty,
    });
  };
};

const refreshLocalStorage = (newUserName: string) => {
  const userString = localStorage.getItem('user') || '{}';
  const user = JSON.parse(userString);
  user.userName = newUserName;
  localStorage.setItem('user', JSON.stringify(user));
};

export const saveUserDataEdit = (edited: IUser) => {
  return (dispatch: Dispatch<UserAction | MessageAction | AuthAction>): Promise<void> => {
    return UserService.updateUserData(edited).then((response) => {
      refreshLocalStorage(edited.userName);

      dispatch({
        type: ActionType.SAVE_USER_DATA_EDIT,
      });

      const serverMessage = response?.data;

      if (serverMessage === 'User profile successfully updated. Relog required.') {
        dispatch({
          type: ActionType.SET_LOGIN_MESSAGE,
          payload: { text: serverMessage, type: 'success' as VariantType },
        });
        AuthService.logout();
        dispatch({
          type: ActionType.LOGOUT,
        });
      } else {
        dispatch({
          type: ActionType.SET_INFO_MESSAGE,
          payload: { text: 'Updated profile', type: 'success' as VariantType },
        });
      }

      return Promise.resolve();
    });
  };
};

// Cryptocurrencies

export const getCryptocurrencies = (
  page: number,
  size: number,
  sortBy: string,
  asc: boolean,
  search: string
) => {
  return (dispatch: Dispatch<CryptocurrencyAction>): void => {
    CryptocurrencyService.getCryptocurrencies(page, size, sortBy, asc, search).then((response) => {
      dispatch({
        type: ActionType.GET_CRYPTOCURRENCIES,
        payload: response.data,
      });
    });
  };
};

export const getCryptocurrency = (id: number) => {
  return (dispatch: Dispatch<CryptocurrencyAction>): void => {
    CryptocurrencyService.getCryptocurrency(id).then((response) => {
      dispatch({
        type: ActionType.GET_CRYPTOCURRENCY,
        payload: response.data,
      });
    });
  };
};

export const getCryptocurrencyHistory = (id: number, timeframe: string) => {
  return (dispatch: Dispatch<CryptocurrencyAction>): void => {
    CryptocurrencyService.getCryptocurrencyHistory(id, timeframe).then((response) => {
      dispatch({
        type: ActionType.GET_CRYPTOCURRENCY_HISTORY,
        payload: response.data.data,
      });
    });
  };
};

export const buyCryptocurrency = (id: number, amount: number, price: number, name: string) => {
  return (dispatch: Dispatch<CryptocurrencyAction | MessageAction>): void => {
    CryptocurrencyService.buyCryptocurrency(id, amount, price).then(
      () => {
        dispatch({
          type: ActionType.BUY_CRYPTOCURRENCY,
        });
        dispatch({
          type: ActionType.SET_INFO_MESSAGE,
          payload: {
            text: 'Succesfully purchased ' + amount + ' ' + name,
            type: 'success',
          },
        });
      },
      (error) => {
        const serverErrorMessage = error.response?.data?.message;
        let errorMessage = 'Cryptocurrency purchase failed.';
        if (!error.response) {
          errorMessage = 'Server is unavailable';
        }
        errorMessage = serverErrorMessage;
        errorMessage &&
          dispatch({
            type: ActionType.SET_INFO_MESSAGE,
            payload: { text: errorMessage, type: 'error' },
          });
      }
    );
  };
};

export const sellCryptocurrency = (id: number, amount: number, price: number, name: string) => {
  return (dispatch: Dispatch<CryptocurrencyAction | MessageAction>): void => {
    CryptocurrencyService.sellCryptocurrency(id, amount, price).then(
      () => {
        dispatch({
          type: ActionType.SELL_CRYPTOCURRENCY,
        });
        dispatch({
          type: ActionType.SET_INFO_MESSAGE,
          payload: {
            text: 'Succesfully sold ' + amount + ' ' + name,
            type: 'success',
          },
        });
      },
      (error) => {
        const serverErrorMessage = error.response?.data?.message;
        let errorMessage = 'Cryptocurrency sale failed.';
        if (!error.response) {
          errorMessage = 'Server is unavailable';
        }
        errorMessage = serverErrorMessage;
        errorMessage &&
          dispatch({
            type: ActionType.SET_INFO_MESSAGE,
            payload: { text: errorMessage, type: 'error' },
          });
      }
    );
  };
};

export const depositMoney = (amount: number) => {
  return (dispatch: Dispatch<CryptocurrencyAction | MessageAction>): void => {
    CryptocurrencyService.depositMoney(amount).then(
      () => {
        dispatch({
          type: ActionType.DEPOSIT_MONEY,
          payload: amount,
        });
        dispatch({
          type: ActionType.SET_INFO_MESSAGE,
          payload: { text: 'Succesfully deposited ' + amount + ' fiat money', type: 'success' },
        });
      },
      (error) => {
        const serverErrorMessage = error.response?.data?.message;
        let errorMessage = 'Money deposit failed.';
        if (!error.response) {
          errorMessage = 'Server is unavailable';
        }
        errorMessage = serverErrorMessage;
        errorMessage &&
          dispatch({
            type: ActionType.SET_INFO_MESSAGE,
            payload: { text: errorMessage, type: 'error' },
          });
      }
    );
  };
};

export const resetMoney = () => {
  return (dispatch: Dispatch<CryptocurrencyAction | MessageAction>): void => {
    CryptocurrencyService.resetMoney().then(
      () => {
        dispatch({
          type: ActionType.RESET_MONEY,
        });
        dispatch({
          type: ActionType.SET_INFO_MESSAGE,
          payload: { text: 'Succesfully reseted fiat money', type: 'success' },
        });
      },
      (error) => {
        const serverErrorMessage = error.response?.data?.message;
        let errorMessage = 'Money reset failed.';
        if (!error.response) {
          errorMessage = 'Server is unavailable';
        }
        errorMessage = serverErrorMessage;
        errorMessage &&
          dispatch({
            type: ActionType.SET_INFO_MESSAGE,
            payload: { text: errorMessage, type: 'error' },
          });
      }
    );
  };
};

export const getWallet = () => {
  return (dispatch: Dispatch<CryptocurrencyAction>): void => {
    CryptocurrencyService.getWallet().then((response) => {
      dispatch({
        type: ActionType.GET_WALLET,
        payload: response.data,
      });
    });
  };
};

export const getTransactions = (page: number, size: number, sortBy: string, asc: boolean) => {
  return (dispatch: Dispatch<CryptocurrencyAction>): void => {
    CryptocurrencyService.getTransactions(page, size, sortBy, asc).then((response) => {
      dispatch({
        type: ActionType.GET_TRANSACTIONS,
        payload: response.data,
      });
    });
  };
};
