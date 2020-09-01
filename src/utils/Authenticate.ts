import {Storage} from '@modules/storage';
// import {Screens} from '@screens/Screens';

/**
 * check user is login app
 * @returns {boolean}
 */
function isLogin(): boolean {
  return !!Storage.User;
}

/**
 * show login screen in any screen
 */
function showLogin(
  target?: string,
  callbackLoginSuccess?: CallbackFunction
): void {
  Storage.Target = target;
  Storage.CallbackLoginSuccess = callbackLoginSuccess;
  // console.log('open: ', {stack: Storage.currentScreenStackId});
  // pushSingleScreen(Storage.currentScreenStackId, Screens.LogIn, '', {}, false);
}

/**
 * use for functional required authentication
 * check if user is login?
 * if user log in execute callback func
 * if not open login screen
 * @param callback
 */
function requireLogin(callback: CallbackFunction) {
  if (isLogin()) {
    callback();
  } else {
    showLogin('', callback);
  }
}

export {isLogin, requireLogin, showLogin};
