/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
export * from './src/components';

AppRegistry.registerComponent(appName, () => App);
