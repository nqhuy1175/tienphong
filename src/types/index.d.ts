declare module 'redux-persist/lib/*';

type CallbackFunction = (...args: any[]) => any;

type DebounceFunction = CallbackFunction & {
  cancel(): void;
  flush(): void;
};

type ObjectType = {[key: string]: any | any[]};

interface DeviceInfo {
  osName: string;
  osVersion: string;
  hasNotch: boolean;
  version: string;
  deviceName: string;
}

interface ToastMessage {
  message: string;
  position?: 'top' | 'center' | 'bottom';
}

interface NavigationConstants {
  statusBarHeight: number;
  backButtonId: string;
  topBarHeight: number;
  bottomTabsHeight: number;
}
