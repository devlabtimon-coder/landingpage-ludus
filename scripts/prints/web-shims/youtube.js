import React from 'react';
import { View } from 'react-native';
export default function YoutubePlayer(props) {
  return React.createElement(View, { style: { height: props.height || 200, backgroundColor: '#0A1F5C', borderRadius: 16 } });
}
