import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet,Text } from 'react-native';

const ImageViewer = ({ route, navigation }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container} className="px-2">
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  closeText: {
    color: 'white',
    fontSize: 20,
  },
});

export default ImageViewer;
