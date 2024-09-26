import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

export default function ResetPassTextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor="#FFE70A" 
        underlineColor="transparent"
        mode="outlined"
        placeholderTextColor="#B0B0B0" 
        theme={{
          colors: {
            primary: '#FFE70A',
            text: '#FFFFFF',
            placeholder: '#B0B0B0', 
            background: '#000000',
          },
        }}
        {...props}
        textColor="#FFFFFF" // Directly set text color to white
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 13,
    color: '#B0B0B0',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: '#FF0000',
    paddingTop: 8,
  },
});
