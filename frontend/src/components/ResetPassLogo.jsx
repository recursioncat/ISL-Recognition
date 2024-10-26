import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function ResetPassLogo() {
  return <Image source={require('../assets/resetpass-logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    marginBottom: 4,
  },
})
