const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path'); // Importar o módulo path

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'webp', 'mp4', 'mov', 'mp3', 'ttf', 'otf', 'xml', 'json'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'wasm', 'svg'],

    extraNodeModules: new Proxy({}, {
      get: (target, name) => {
        if (name === 'assets') {
          return path.resolve(__dirname, 'src/assets');
        }
        return path.join(process.cwd(), 'node_modules', name);
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);