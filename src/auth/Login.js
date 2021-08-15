import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AuhtContext} from '../context/context';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginHelper, registerHelper} from '../helper/login';

const {height, width} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [input, setInput] = useState({
    username: '',
    idToken: '',
    email: '',
    photo: '',
  });

  const {signIn} = useContext(AuhtContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '79411489244-lp4j7usu0cbi0tjokol0nmpoiac3ncde.apps.googleusercontent.com',
    });
    if (input.username.length > 0) {
      loginHandle();
    }
  }, [input]);

  const setLocalStorage = async user => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const googlelogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setInput({
        ...input,
        username: userInfo.user.name,
        idToken: userInfo.idToken,
        email: userInfo.user.email,
        photo: userInfo.user.photo,
      });
      // setLocalStorage(userInfo.user);
      // setUserName(userInfo.user.name);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const loginHandle = () => {
    // signIn(input.username, input.idToken);
    // setLocalStorage(result.user);
    registerHelper(input).then(result => {
      if (!result) {
        Alert.alert('Error', 'Error in network');
        return;
      }
      if (result.error) {
        if (result.message === 'Email Id Already registerd') {
          existLogin();
        } else {
          Alert.alert('Error', result.message);
          return;
        }
      } else {
        console.log('user', result.user.username, result.user.idToken);
        setLocalStorage(result.user);
        signIn(result.user.username, result.user.idToken);
      }
    });
  };

  const existLogin = () => {
    loginHelper(input).then(loginresult => {
      if (!loginresult) {
        Alert.alert('Error', 'Error in network');
        return;
      }
      console.log('loginresult', loginresult);
      if (loginresult.error) {
        Alert.alert('Error', loginresult.message);
        return;
      }
      setLocalStorage(loginresult.user);
      signIn(loginresult.user.username, loginresult.user.idToken);
      console.log('result', loginresult.user);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Expense Tracker</Text>
      </View>
      <View style={styles.footer}>
        <View style={{padding: 30}}>
          <Text style={{color: '#4169E1', fontSize: 34}}>Welcome</Text>
          <Text style={{fontSize: 15, color: '#696969'}}>
            Let's keep track on expenses and start budget so you'll never run
            out of money again ! {'\n'} Don't have an account?
            <Text style={{color: '#FF6347', fontStyle: 'italic'}}>
              {'\n '}
              Login Here 👇👇
            </Text>
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.googlelog}
            onPress={() => googlelogin()}>
            <Image
              source={require('../assets/google.png')}
              style={styles.googleimg}
            />
            <View style={styles.googletxtsec}>
              <Text style={styles.googletxt}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4169E1',
  },
  header: {
    flex: 1,
    height: height / 1.72,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#F5F5F5',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  googlelog: {
    flexDirection: 'row',
    margin: 20,
    borderColor: '#FFF',
    borderWidth: 1,
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    width: '75%',
  },
  googleimg: {
    height: 30,
    width: 30,
    backgroundColor: '#FFF',
    margin: 2,
    borderRadius: 20,
    padding: 4,
  },
  googletxtsec: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingLeft: 10,
  },
  googletxt: {
    color: '#FFF',
    fontSize: 20,
  },
});
