import {setDefaultOptions, startApp, startLogin} from '@libs/Navigation';
import addLayoutProcessors from '@libs/Navigation/LayoutProcessors';
import addOptionsProcessors from '@libs/Navigation/OptionProcessors';
import {Storage} from '@modules/storage';
import auth from '@react-native-firebase/auth';
import {initializeStore, rehydrateStore} from '@redux/store';
import {registerScreens} from '@screens/index';
import {iconsLoader} from '@utils/AppIcons';
import {isLogin} from '@utils/Authenticate';
import config from 'config';
import {Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Navigation} from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import {Store} from 'redux';

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;

function start() {
  const reduxStore = initializeStore();
  registerScreens(reduxStore);
  addLayoutProcessors();
  addOptionsProcessors();
  setDefaultOptions();
  Navigation.events().registerAppLaunchedListener(() => {
    didFinishLaunchingWithOptions(reduxStore);
  });
}

function didFinishLaunchingWithOptions(reduxStore: Store) {
  rehydrateStore(reduxStore, handleLoadData);

  async function handleLoadData() {
    // try {
    //   await auth().signOut();
    // } catch (e) {
    //   console.log(e);
    // }
    const objStore = reduxStore.getState();
    if (objStore) {
      Storage.User = auth().currentUser;
      // Storage.accessToken = objStore.app.accessToken;
      // // Storage.accessToken =
      //   'eyJDVCI6MCwiQ0kiOjEsIlVJIjoyMDIzMywiU0UiOiIxNTg1MDk5NjQwMTE4NTk0NyJ9';
      // Storage.isLogin = objStore.app.isLogin;
    }
    const jobs = [iconsLoader, getDeviceInfo(), Navigation.constants()];
    Promise.all(jobs)
      .then((result) => {
        console.log(result);
        console.log('PRELOAD APP DATA SUCCESS', auth().currentUser);
        Storage.DeviceInfo = result[1] as DeviceInfo;
        Storage.NavigationConstants = result[2] as NavigationConstants;
        if (config.AUTH_REQUIRED && !isLogin()) {
          startLogin();
        } else {
          startApp();
        }
        SplashScreen.hide();
      })
      .catch((e) => {
        console.log(e);
        startApp();
        SplashScreen.hide();
      });
  }

  async function getDeviceInfo() {
    return {
      osName: await DeviceInfo.getSystemName(),
      osVersion: await DeviceInfo.getSystemVersion(),
      hasNotch: await DeviceInfo.hasNotch(),
      version: await DeviceInfo.getVersion(),
      deviceName: await DeviceInfo.getDeviceName()
    };
  }
}

export {start};
