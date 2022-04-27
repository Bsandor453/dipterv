import { ActionType } from '../action-types';
import { AuthAction, UserAction } from '../actions';
import IToken from '../../interfaces/IToken';

const userString = localStorage.getItem('user') || '{}';

const initialState = {
  isLoggedIn: userString !== '{}',
  token: JSON.parse(userString),
};

type authState = {
  isLoggedIn: boolean;
  token: IToken | null;
};

const reducer = (state: authState = initialState, action: AuthAction | UserAction): authState => {
  switch (action.type) {
    case ActionType.REGISTER:
      return state;
    case ActionType.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    case ActionType.EDIT_USER_DATA:
      if (action.payload.name === 'userName') {
        return {
          ...state,
          token: { ...(state.token || initialState.token), username: action.payload.value },
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default reducer;
