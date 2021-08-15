import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Container, Content, Form, Input, Item} from 'native-base';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

// Components
import Header from '../components/Header';
import {addExpenseByUser} from '../helper/expense';
import {addTransaction} from '../store/actions/transactionActions';

const AddTransactions = () => {
  // const dispatch = useDispatch();

  const [user, setUser] = useState('');

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      setUser(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  };

  const [input, setInput] = useState({
    userId: '',
    title: '',
    price: '',
  });

  useEffect(() => {
    getUser();
  }, []);

  const onSubmitEdit = () => {
    setInput({...input, userId: user._id});

    if (!input.title || !input.price) {
      return alert('Please fill all the fields');
    }

    addExpenseByUser(input).then(result => {
      if (result.error) {
        Alert.alert('Error', result.message);
        return;
      }

      Alert.alert('Success', 'Expense Added Successfully');
      setInput({...input, title: '', price: ''});
    });
  };

  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item style={styles.item}>
            <Input
              placeholder="Expense Title"
              onChangeText={e => setInput({...input, title: e})}
            />
          </Item>
          <Item style={styles.item}>
            <Input
              placeholder="Amount expense eg: -50"
              keyboardType="number-pad"
              onChangeText={e => setInput({...input, price: e})}
            />
          </Item>
          <Button
            block
            style={{margin: 10, borderRadius: 40}}
            onPress={onSubmitEdit}>
            <Text style={{color: '#FFF', fontSize: 18}}>Add Expense</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default AddTransactions;

const styles = StyleSheet.create({
  item: {
    marginVertical: 20,
  },
});
