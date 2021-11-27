/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
export * from './src/components';
export FileViewer from 'react-native-file-viewer';

AppRegistry.registerComponent(appName, () => App);
