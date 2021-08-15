import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import Home from './Home';
import AddTransactions from './AddTransactions';
import store from '../store';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <Provider store={store}>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Add" component={AddTransactions} />
      </RootStack.Navigator>
    </Provider>
  );
};

export default RootStackScreen;
