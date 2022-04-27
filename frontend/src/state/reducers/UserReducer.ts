import { ActionType } from '../action-types';
import { UserAction } from '../actions';
import IUser from '../../interfaces/IUser';

const initialState = {
  userName: '',
  fullName: '',
  roles: null,
  email: '',
};

const reducer = (state: IUser = initialState, action: UserAction): IUser => {
  switch (action.type) {
    case ActionType.GET_USER_DATA:
      return {
        ...state,
        userName: action.payload.userName ? action.payload.userName : '',
        fullName: action.payload.fullName ? action.payload.fullName : '',
        email: action.payload.email ? action.payload.email : '',
        roles: action.payload.roles ? action.payload.roles : [],
        password: action.payload.password ? action.payload.password : '',
      };
    case ActionType.EDIT_USER_DATA:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ActionType.CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
