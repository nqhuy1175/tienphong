import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';
import {start} from './src/App';

YellowBox.ignoreWarnings(['Remote debugger']);

// todo: fix this
// see https://github.com/facebook/react-native/issues/15059 for more detail
console.reportErrorsAsExceptions = false;

start();
