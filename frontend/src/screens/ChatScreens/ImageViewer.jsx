import React, { useEffect, useState, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Animated, StatusBar, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components';
import Video from 'react-native-video';

const ImageViewer = ({ route }) => {
  const { imageUrl, videoUrl, senderName, type } = route.params;
  const navigation = useNavigation();

  const [isBarVisible, setIsBarVisible] = useState(true);
  const [loading, setLoading] = useState(true); // State for loading
  const animation = useRef(new Animated.Value(1)).current;
  const videoRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const toggleBarVisibility = () => {
    const toValue = isBarVisible ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsBarVisible(!isBarVisible));
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleVideoPress = () => {
    toggleBarVisibility(); // Toggle bar visibility on video press
  };

  return (
    <TouchableWithoutFeedback onPress={toggleBarVisibility}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator size="large" color="#fff" style={styles.loading} />
        )}

        {/* Conditionally render Image or Video based on type */}
        {type === 'image' ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" className="border border-solid rounded-xl" />
        ) : (
          <TouchableWithoutFeedback onPress={handleVideoPress}>
            <Video
              source={{ uri: videoUrl }}
              ref={videoRef}
              onLoadStart={() => setLoading(true)} // Show loading when the video starts loading
              onLoad={() => setLoading(false)} // Hide loading when the video is ready
              onError={(e) => {
                console.error('Video error:', e);
                setLoading(false); // Hide loading on error
              }}
              controls // Show native controls
              resizeMode="contain"
              style={styles.video} // Define the video style
            />
          </TouchableWithoutFeedback>
        )}

        {/* Animated Top Bar */}
        <Animated.View style={[styles.topBar, { opacity: animation }]} className="pt-6 pl-2">
          <BackButton goBack={handleBackPress} />
          <Text className="ml-5 pl-5 text-slate-100 text-lg font-bold ">{senderName}</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
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
  video: {
    width: '100%',
    height: '100%',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  }
});

export default ImageViewer;
