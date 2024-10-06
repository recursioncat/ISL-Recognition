import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OutgoingCallScreen = ({ calleeName, profilePicture , processEnd }) => {
  return (
      <View style={styles.container}>
    <StatusBar backgroundColor="#111" barStyle="light-content" />
      {/* Caller Info */}
      <Text style={styles.callerText}>Calling...</Text>
      <Text style={styles.calleeName}>{calleeName}</Text>
      
      {/* Profile Picture */}
      <Image
        source={{ uri: profilePicture }}
        style={styles.profilePicture}
      />

      {/* End Call Action */}
      <TouchableOpacity style={styles.endCallButton} onPress={processEnd} >
        <MaterialIcons name="call-end" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  callerText: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 8,
  },
  calleeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  endCallButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    marginTop: 5,
  },
};

export default OutgoingCallScreen;
