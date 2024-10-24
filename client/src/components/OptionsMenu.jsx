import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Pressable  } from 'react-native';
import { RadioButton } from 'react-native-paper';


const OptionsMenu = () => {
  const [checked, setChecked] = React.useState('Male');

  return (
    <View className="w-full" >
    <Text className="text-gray-600 text-lg">Gender</Text>
      <View className="flex flex-row justify-around">
      <Pressable 
        className="flex-row items-center" 
        onPress={() => setChecked('Male')}
      >
        <RadioButton
          className="text-purple-500"
          value="Male"
          status={checked === 'Male' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('Male')}
        />
        <Text className=" text-purple-500">Male</Text>
      </Pressable>
     
      <Pressable 
        className="flex-row items-center" 
        onPress={() => setChecked('Female')}
      >
      <RadioButton
        value="Female"
        status={ checked === 'Female' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Female')}
      />
      <Text className=" text-purple-500">Female</Text>
      </Pressable>
      <Pressable 
        className="flex-row items-center" 
        onPress={() => setChecked('Others')}
      >
      <RadioButton
        value="Others"
        status={ checked === 'Others' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('Others')}
      />
      <Text className=" text-purple-500">Others</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default OptionsMenu;