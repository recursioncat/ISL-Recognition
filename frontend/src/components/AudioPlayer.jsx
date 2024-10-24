import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Sound from 'react-native-sound';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AudioPlayer = ({ audioUri }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // Duration in seconds
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(0)); // Animation for progress line

  // Load sound and set duration
  useEffect(() => {
    const soundInstance = new Sound(audioUri, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load sound', error);
        return;
      }
      setDuration(soundInstance.getDuration());
    });

    setSound(soundInstance);
    return () => {
      if (soundInstance) {
        soundInstance.release();
      }
    };
  }, [audioUri]);

  // Play or pause the sound
  const togglePlayPause = () => {
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play((success) => {
        if (success) {
          setIsPlaying(false);
          setCurrentTime(0);
          progress.setValue(0); // Reset progress when finished
        }
      });
      setIsPlaying(true);
      updateProgress();
    }
  };

  // Update progress line animation and current time
  const updateProgress = () => {
    const interval = setInterval(() => {
      sound.getCurrentTime((seconds) => {
        setCurrentTime(seconds);
        Animated.timing(progress, {
          toValue: (seconds / duration) * 100,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <Animated.View style={[styles.progressLine, { width: progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }) }]} />

      {/* Play / Pause button */}
      <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
        <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={30} color="white" />
      </TouchableOpacity>

      {/* Duration and Current Time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}> / {formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 50,
    backgroundColor: '#1f2c34',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  progressLine: {
    position: 'absolute',
    bottom: 1.5,
    left: 9,
    height: 4,
    backgroundColor: '#21c063',
    borderRadius: 2,
  },
  playPauseButton: {
    marginRight: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 5,
  },
});

export default AudioPlayer;
