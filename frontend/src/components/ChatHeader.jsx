import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const setHeaderLeft = (navigation, profilePicture) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image
        source={{uri: profilePicture}}
        style={{width: 40, height: 40, borderRadius: 20, marginLeft: 10}}
      />
    </View>
  );
};

export const setHeaderRight = () => {
  return (
    <TouchableOpacity className="mr-5">
      <MaterialIcons name="videocam" size={30} color="white" />
    </TouchableOpacity>
  );
};

