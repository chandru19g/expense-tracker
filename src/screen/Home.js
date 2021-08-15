import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {CheckBox, Container, Right, ListItem, Body} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';

// Components
import Header from '../components/Header';
import Cards from '../components/Cards';
import Empty from '../components/Empty';
import {useDispatch} from 'react-redux';
import {deleteTransaction} from '../store/actions/transactionActions';
import {deleteExpenseById, getExpenseByUser} from '../helper/expense';

const Item = ({title, price, id}) => {
  const deleteOnClick = expenseId => {
    deleteExpenseById(expenseId).then(result => {
      if (result.error) {
        Alert.alert('Error in finding Expense');
        return;
      }
      Alert.alert(result.message);
    });
  };

  return (
    <View
      style={{marginVertical: 2, marginHorizontal: 30, paddingVertical: 15}}>
      <ListItem>
        <CheckBox
          color="#FF4500"
          onPress={() => {
            deleteOnClick(id);
          }}
        />
        <Body>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              marginLeft: 10,
            }}>
            {title}
          </Text>
        </Body>
        <Right>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 18,
              fontWeight: '400',
              color: price > 0 ? '#1BC44B' : '#EA1601',
            }}>
            {price > 0 ? `₹${price}` : `-₹${Math.abs(price)}`}
          </Text>
        </Right>
      </ListItem>
    </View>
  );
};

const Home = ({navigation}) => {
  const [user, setUser] = useState('');
  // const {transactions} = useSelector(state => state.transactions);
  const [expense, setExpense] = useState('');

  // console.log(id.map(i => i.id));
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      setUser(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    if (user._id) getExpense();
  }, [user._id]);

  const getExpense = () => {
    let userId = user._id;
    console.log(userId);
    getExpenseByUser(userId).then(result => {
      console.log('result', result);
      if (result.error) {
        Alert.alert('Error in finding Expense');
        return;
      }
      console.log('result', result);
      setExpense(result.expense);
    });
  };
  console.log(expense);
  return (
    <Container>
      <Header />
      <Animated.View style={styles.HomeBody}>
        <Cards name={user.username} navigation={navigation} expense={expense} />
      </Animated.View>
      <View style={{flex: 1, marginTop: -170}}>
        {expense.length > 0 ? (
          <FlatList
            data={expense}
            renderItem={({item}) => (
              <Item title={item.title} price={item.amount} id={item._id} />
            )}
            keyExtractor={item => item._id.toString()}
          />
        ) : (
          <Empty />
        )}
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeBody: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
