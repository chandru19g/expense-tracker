import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Empty = () => {
  return (
    <View style={{alignItems: 'center', marginTop: 30}}>
      <Text style={{color: '#FF4500', fontWeight: '700', fontSize: 20}}>
        No Transactions Yet
      </Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
