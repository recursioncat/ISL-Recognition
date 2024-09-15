import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { EngToSign , StartScreen , SignToText } from './screens';
import TranslatorNavigator from './TranslatorNavigator';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
   
    <Tab.Screen name="Translator" component={TranslatorNavigator} options={{
      tabBarLabel: 'Translator',
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="translate" color={color} size={size} />
      ),
    }} />
    <Tab.Screen name="Call" component={ChatScreen} options={{
      tabBarLabel: 'Call',
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="phone" color={color} size={size} />
      ),
    }} />
    <Tab.Screen name="Account" component={ProfileScreen} options={{
      tabBarLabel: 'Account',
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="account-circle" color={color} size={size} />
      ),
    }} />
  </Tab.Navigator>
  )
}

export default Tabs;