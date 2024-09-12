import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Provider } from 'react-native-paper'
import AuthNavigator from './AuthNavigator';
import {SplashScreen} from './screens/index';
import Tabs from './Tabs';
import { theme } from './core/theme';
import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();


function App(){
 

  return (
   
    <Provider theme={theme}>
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
         
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />

          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
        {/* <Toast /> */}
      </NavigationContainer>
      <Toast />
   </Provider>
  
  );
}

export default App;
