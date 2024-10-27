import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'



export default function Testing() {
  return (
    <>
      
      <WebView
        originWhitelist={['*']}
        source={{uri : 'https://isl-recognition.vercel.app/' }} // Replace with your deployed app URL
        javaScriptEnabled={true}
        cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
        onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
        }}
        style={{ flex: 1 }}
      />
     
    </>
  )
}
