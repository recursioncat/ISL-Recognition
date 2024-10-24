import React from 'react'
import { StyleSheet,View} from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Header(props) {

  return (
  <View className="flex-row mt-5">
    <Text className="text-2xl text-slate-200 font-bold p-5" >{props.title}</Text>
    <View className="absolute right-0 py-5 px-2" >
    {props.icon && (
        <MaterialIcons
          name={props.icon}
          size={25}
          color="#fff"
          className="absolute right-0 p-5"
        />
      )}
    </View>
  </View>
)}


