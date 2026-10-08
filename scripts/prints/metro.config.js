const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const config = getDefaultConfig(__dirname);
const shims = { 'expo-secure-store': 'web-shims/secure-store.js', 'react-native-maps': 'web-shims/maps.js', 'react-native-youtube-iframe': 'web-shims/youtube.js' };
const orig = config.resolver.resolveRequest;
config.resolver.resolveRequest = (ctx, name, platform) => {
  if (platform === 'web' && shims[name]) return { type: 'sourceFile', filePath: path.join(__dirname, shims[name]) };
  return orig ? orig(ctx, name, platform) : ctx.resolveRequest(ctx, name, platform);
};
config.watchFolders = [require('fs').realpathSync(path.join(__dirname, 'node_modules'))];
module.exports = config;
