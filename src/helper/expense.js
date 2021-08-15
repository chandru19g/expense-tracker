const API = 'https://expense-tracker-apinative.herokuapp.com/api';

export const getExpenseByUser = async userId => {
  console.log(userId);
  return fetch(`${API}/getExpense/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(err => console.error(err));
};

export const deleteExpenseById = async expenseId => {
  return fetch(`${API}/deleteExpense/${expenseId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(result => result.json())
    .catch(err => console.error(err));
};

export const addExpenseByUser = async input => {
  return fetch(`${API}/addExpenses`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then(result => result.json())
    .catch(err => console.error(err));
};
