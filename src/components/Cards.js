import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

// components
import AddButton from './AddButton';

const Cards = ({name, navigation}) => {
  const {transactions} = useSelector(state => state.transactions);

  const prices = transactions.map(transaction => transaction.price);
  // const prices = transactions.map(transaction => transaction.amount);

  const totalPrice = prices.reduce((prev, cur) => (prev += cur), 0);

  const expense =
    prices.filter(price => price < 0).reduce((prev, cur) => (prev += cur), 0) *
    -1;

  return (
    <LinearGradient
      colors={['#FFAA00', '#EFC90A', '#FFC300']}
      style={styles.Box}>
      <View style={{width: '70%', alignItems: 'flex-start'}}>
        <Text
          style={{
            fontSize: 15,
            color: '#FFF',
            fontWeight: '600',
            fontFamily: 'Lato-Regular',
          }}>
          Current Balance
        </Text>
        <Text
          style={{
            fontFamily: 'Lato-Medium',
            fontSize: 32,
            color: '#FFF',
            fontWeight: '700',
            marginTop: 20,
          }}>
          ₹{totalPrice}
        </Text>
        <Text
          style={{
            marginTop: 47,
            color: '#FFF',
            fontFamily: 'Lato-Regular',
            fontSize: 18,
            fontWeight: '700',
          }}>
          {name}
        </Text>
      </View>
      <View style={{alignItems: 'flex-end', width: '30%'}}>
        <Text style={{fontSize: 18, color: '#FFF'}}>Amount</Text>
        <View style={{flex: 1}}>
          <AddButton navigation={navigation} />
          <Text
            style={{
              marginTop: 17,
              color: '#FFF',
              fontSize: 15,
              fontWeight: '700',
            }}>
            Expense
          </Text>
          <Text style={{color: '#FFF', fontSize: 20, fontWeight: '700'}}>
            ₹{expense}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Cards;

const styles = StyleSheet.create({
  Box: {
    width: '100%',
    height: 189,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 22,
  },
});
