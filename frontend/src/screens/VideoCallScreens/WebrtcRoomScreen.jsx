import react, {useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
// import WebRTC 
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const WebrtcRoomScreen = ({localStream, remoteStream, peerConnection, setlocalStream, setType}) => {
    // Handling Mic status
     const [localMicOn, setlocalMicOn] = useState(true);

      // Handling Camera status
     const [localWebcamOn, setlocalWebcamOn] = useState(true);

      // Switch Camera
     function switchCamera() {
        localStream.getVideoTracks().forEach((track) => {
          track._switchCamera();
        });
      }

      // Enable/Disable Camera
      function toggleCamera() {
        localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
        localStream.getVideoTracks().forEach((track) => {
          localWebcamOn ? (track.enabled = false) : (track.enabled = true);
        });
      }

      // Enable/Disable Mic
      function toggleMic() {
        localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
        localStream.getAudioTracks().forEach((track) => {
          localMicOn ? (track.enabled = false) : (track.enabled = true);
        });
      }

      // Destroy WebRTC Connection
      function leave() {
        peerConnection.current.close();
        setlocalStream(null);
        setType("CHAT"); // change it and insted of this we can navigate to the chat screen
      }

      const controlIcons = [
        {
          name: "call-end",
          color: "red",
          size: 36,
          onPress: leave,
        },
        {
          name: localMicOn ? "mic" : "mic-off",
          color: localMicOn ? "#FFF" : "#1D2939",
          size: 36,
          onPress: toggleMic,
        },
        {
          name: localWebcamOn ? "videocam" : "videocam-off",
          color: localWebcamOn ? "#FFF" : "#1D2939",
          size: 36,
          onPress: toggleCamera,
        },
        {
          name: "switch-camera",
          color: "#FFF",
          size: 36,
          onPress: switchCamera,
        },
      ];

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#050A0E",
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
      >
        {localStream ? (
          <RTCView
            objectFit={"cover"}
            style={{ flex: 1, backgroundColor: "#050A0E" }}
            streamURL={localStream.toURL()}
          />
        ) : null}
        {remoteStream ? (
          <RTCView
            objectFit={"cover"}
            style={{
              flex: 1,
              backgroundColor: "#050A0E",
              marginTop: 8,
            }}
            streamURL={remoteStream.toURL()}
          />
        ) : null}
        <View
        style={{
          marginVertical: 12,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {controlIcons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={icon.onPress}
            className="px-3 py-2"
            style={{
              backgroundColor: icon.color === "red" ? "red" : "transparent",
              borderRadius: 30,
              borderWidth: icon.name === "mic" || icon.name === "mic-off" || icon.name === "videocam" || icon.name === "videocam-off" ? 1.5 : 0,
              borderColor: icon.name === "mic" || icon.name === "mic-off" || icon.name === "videocam" || icon.name === "videocam-off" ? "#2B3034" : "transparent",
            }}
          >
            <MaterialIcons name={icon.name} size={icon.size} color={icon.color === "red" ? "white" : icon.color} />
          </TouchableOpacity>
        ))}
      </View>
      </View>
    );
  };

export default WebrtcRoomScreen;