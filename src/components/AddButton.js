import {Button} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AddButton = ({navigation}) => {
  return (
    <View>
      <Button
        rounded
        light
        style={{
          padding: 10,
          marginTop: 32,
          borderWidth: 3,
          borderColor: '#FFF',
          backgroundColor: '#E10C62',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('Add')}>
        <Text
          style={{
            color: '#FFF',
            fontWeight: '700',
            padding: 5,
            fontSize: 18,
          }}>
          +
        </Text>
      </Button>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({});
