// import react, {useState, useEffect, useRef} from 'react';
// import { View, Text } from 'react-native';
// import io from 'socket.io-client'; // import socket io
// // import WebRTC 
// import {
//   mediaDevices,
//   RTCPeerConnection,
//   RTCView,
//   RTCIceCandidate,
//   RTCSessionDescription,
// } from 'react-native-webrtc';
// import { baseUrl } from '../../utils';
// import WebrtcRoomScreen from './WebrtcRoomScreen';
// import IncomingCallScreen from './IncomingCallScreen';
// import OutgoingCallScreen from './OutgoingCallScreen';

// const socket = io(baseUrl);

// const VideoCallScreen = ({navigation,route}) => {

//     const {calleName,calleProfilePicture,localStream,remoteStream,peerConnection,setlocalStream} = route.params;
   
//     switch (type) {
//         case 'Outgoing_CALL':
//             return <OutgoingCallScreen calleeName={calleName} profilePicture={calleProfilePicture} />;
//         case 'INCOMING_CALL':
//             return <IncomingCallScreen calleeName={calleName} profilePicture={calleProfilePicture} />; // it should be the caller name and profile picture
//         case 'WEBRTC_ROOM':
//             return <WebrtcRoomScreen localStream={localStream} remoteStream={remoteStream} peerConnection={peerConnection} setlocalStream={setlocalStream} setType={setType} />;
//         default:
//             return null;
//     }
    
//     }

// export default VideoCallScreen;