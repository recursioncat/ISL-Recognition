import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IncomingCallScreen = ({ callerName, profilePicture , processAccept , processEnd }) => {
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="#111" barStyle="light-content" />
      {/* Caller Info */}
      <Text style={styles.callerText}>Incoming Call...</Text>
      <Text style={styles.callerName}>{callerName}</Text>
      
      {/* Profile Picture */}
      <Image
        source={{ uri: profilePicture }}
        style={styles.profilePicture}
      />

      {/* Call Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={processEnd}>
          <MaterialIcons name="call-end" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptButton} onPress={processAccept}>
          <MaterialIcons name="call" size={30} color="white" />
        </TouchableOpacity>
      </View>
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
  callerName: {
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  declineButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 5,
  },
};

export default IncomingCallScreen;
