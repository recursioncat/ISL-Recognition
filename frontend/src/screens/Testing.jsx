import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import Character from '../components/Charecter'
import useControls from 'r3f-native-orbitcontrols'


export default function Testing() {
  const [OrbitControls , events] = useControls()
  return (
    <>
      
      {/* <WebView
        originWhitelist={['*']}
        source={{uri : 'https://isl-recognition.vercel.app/' }} // Replace with your deployed app URL
        javaScriptEnabled={true}
        cacheMode={'LOAD_CACHE_ELSE_NETWORK'}
        onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
        }}
        style={{ flex: 1 }}
      /> */}
      <View style={{flex: 1}} {...events}>
      <Canvas
  onCreated={(state) => {
    const _gl = state.gl.getContext()

    const pixelStorei = _gl.pixelStorei.bind(_gl)
    _gl.pixelStorei = function(...args) {
      const [parameter] = args

      switch(parameter) {
        // expo-gl only supports the flipY param
        case _gl.UNPACK_FLIP_Y_WEBGL:
          return pixelStorei(...args)
      }
    }
  }}
>
      <OrbitControls />
        <Suspense fallback={null}>
          <ambientLight intensity={3} />
          <Character />
        </Suspense>
      </Canvas>
      </View>
     
    </>
  )
}
