import React from 'react';
import { View } from 'react-native';
const MapView = (props) => React.createElement(View, { style: [props.style, { backgroundColor: '#E8EBF7' }] }, props.children);
export const Marker = () => null;
export const PROVIDER_GOOGLE = 'google';
export default MapView;
