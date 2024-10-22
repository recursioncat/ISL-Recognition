import React,{useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ContactsScreen, ChatScreen, SaveContactScreen, ImageViewer } from './screens/index';


const Stack = createStackNavigator();

export default function ChatingNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="ContactsScreen"
      screenOptions={{
        headerStyle: {backgroundColor: '#0B141B'}, // Set header background color for all screens
        headerTintColor: '#fff', // Set header text/icon color for all screens
        headerMode: 'screen', // Set the header mode to screen
      }}>
      <Stack.Screen name="ContactsScreen" component={ContactsScreen} options={{headerShown : false}} />
      <Stack.Screen name="SaveContactScreen" component={SaveContactScreen}  options={{headerShown : false}}/>
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: true, // Show the header as needed
          headerMode: 'screen', // Set the header mode to screen
          tabBarStyle: { display: 'none' },
        }}
      />
      <Stack.Screen name="ImageViewer" component={ImageViewer} options={{
          tabBarStyle: { display: 'none' },
        }} />
    </Stack.Navigator>
  );
}
