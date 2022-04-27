import { ActionType } from '../action-types';
import { MessageAction } from '../actions';
import { VariantType } from 'notistack';
import IMessage from '../../interfaces/IMessage';

const initialState = {
  register: { text: '', type: 'success' as VariantType },
  login: { text: '', type: 'success' as VariantType },
  info: { text: '', type: 'success' as VariantType },
};

type messageState = {
  register: IMessage;
  login: IMessage;
  info: IMessage;
};

const reducer = (state: messageState = initialState, action: MessageAction): messageState => {
  switch (action.type) {
    case ActionType.SET_REGISTER_MESSAGE:
      return { ...state, register: action.payload };
    case ActionType.SET_LOGIN_MESSAGE:
      return { ...state, login: action.payload };
    case ActionType.SET_INFO_MESSAGE:
      return { ...state, info: action.payload };
    default:
      return state;
  }
};

export default reducer;
