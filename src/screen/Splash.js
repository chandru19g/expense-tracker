import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var bg = require('../assets/splash.png');

const {height, width} = Dimensions.get('screen');

const Splash = ({navigation}) => {
  return (
    <ImageBackground source={bg} style={styles.imgContainer}>
      <StatusBar barStyle="default" />
      <View style={styles.imgBody}>
        <Text style={styles.header}>Expense Tracker</Text>
        <Text style={styles.body}>
          Let's track your expenses and start budgeting{' '}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  imgContainer: {
    height: height * 0.9,
    width: width * 1,
  },
  imgBody: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 20,
    marginBottom: height / 5,
  },
  header: {
    color: '#DCDCDC',
    fontSize: 40,
    marginTop: 40,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 20,
    color: '#C0C0C0',
  },
});
