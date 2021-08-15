import {ADD_TRANSACTION, DELETE_TRANSACTION} from '../actions/types';

const initialState = {
  transactions: [{id: 1, title: 'Income', price: 100}],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== payload,
        ),
      };
    default:
      return state;
  }
};
