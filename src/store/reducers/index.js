import {combineReducers} from 'redux';

import transactionReducer from './Transactions';

export default combineReducers({
  transactions: transactionReducer,
});
