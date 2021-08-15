import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuhtContext} from '../context/context';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const {signOut} = useContext(AuhtContext);
  const [user, setUser] = useState('');

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
  }, []);

  return (
    <View style={styles.conatiner}>
      <View style={styles.header}>
        <Image source={{uri: `${user.photo}`}} style={styles.ProfileImg} />
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#5F9EA0'}}>
          Expense Tracker
        </Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Image
            source={require('../assets/logout.png')}
            style={{...styles.ProfileImg, tintColor: '#20B2AA'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 0.7,
  },
  ProfileImg: {
    height: 30,
    width: 30,
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
});
