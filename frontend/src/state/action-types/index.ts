export enum ActionType {
  // Authentication
  REGISTER = 'register',
  LOGIN = 'login',
  LOGOUT = 'logout',

  // Message
  SET_REGISTER_MESSAGE = 'set_register_message',
  SET_LOGIN_MESSAGE = 'set_login_message',
  SET_INFO_MESSAGE = 'set_info_message',

  // User data
  GET_USER_DATA = 'get_user_data',
  CLEAR_USER_DATA = 'clear_user_data',
  EDIT_USER_DATA = 'edit_user_data',
  SAVE_USER_DATA_EDIT = 'save_user_date_edit',

  // Testing
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  BANKRUPT = 'bankrupt',

  // Cryptocurrencies
  GET_SUMMARY = 'get_summary',
  GET_CRYPTOCURRENCIES = 'get_cryptocurrencies',
  GET_CRYPTOCURRENCY = 'get_cryptocurrency',
  GET_CRYPTOCURRENCIES_WITH_IDS = 'get_cryptocurrencies_with_ids',
  GET_CRYPTOCURRENCIES_IN_WALLET = 'get_cryptocurrencies_in_wallet',
  GET_CRYPTOCURRENCIES_IN_TRANSACTIONS = 'get_cryptocurrencies_in_transactions',
  GET_CRYPTOCURRENCY_HISTORY = 'get_cryptocurrency_history',
  CLEAR_CRYPTOCURRENCIES = 'clear_cryptocurrencies',
  BUY_CRYPTOCURRENCY = 'buy_cryptocurrency',
  SELL_CRYPTOCURRENCY = 'sell_cryptocurrency',
  DEPOSIT_MONEY = 'deposit_money',
  RESET_MONEY = 'reset_money',
  GET_WALLET = 'get_wallet',
  GET_TRANSACTIONS = 'get_transactions',
}
