import React, {useMemo, useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './src/screen/RootStackScreen';
import {AuhtContext} from './src/context/context';
import Login from './src/auth/Login';
import Splash from './src/screen/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (userName, idtoken) => {
        // setUserToken('fsdj');
        // setIsLoading(false);
        let userToken;
        userToken = null;
        if (userName) {
          try {
            userToken = idtoken;
            await AsyncStorage.setItem('userToken', idtoken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 5000);
  }, []);

  if (loginState.isLoading) {
    return <Splash />;
  }

  return (
    <AuhtContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? <RootStackScreen /> : <Login />}
      </NavigationContainer>
    </AuhtContext.Provider>
  );
};

export default App;
