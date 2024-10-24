import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SaveContactIcon({classStyle, onPress}) {
  return (
    <View
      className={` w-[65px] border-solid  ${classStyle}`}
      style={{backgroundColor: '#21C063'}}>
      <TouchableOpacity onPress={onPress}>
        <Text className="m-5">
          <MaterialIcons name="add-comment" color={'black'} size={25} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
