/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App.original.tsx';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
