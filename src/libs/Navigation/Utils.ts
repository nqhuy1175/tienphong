import {layoutAuthenticate, layoutRoot} from '@libs/navigation/Layouts';
import {Storage} from '@modules/storage';
import {Screens} from '@screens/Screens';
import {APP_STACK_ID, TAB_ROOT_ID} from '@utils/enum';
import {
  Navigation,
  OptionsModalPresentationStyle
} from 'react-native-navigation';

export function showToast(passProps: ToastMessage) {
  Navigation.showOverlay({
    component: {
      name: Screens.Toast,
      options: {
        layout: {
          componentBackgroundColor: 'transparent'
        },
        overlay: {
          interceptTouchOutside: false
        }
      },
      passProps: {
        ...passProps
      }
    }
  });
}

export function showModal(screens: string, passProps?: object) {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: screens,
            name: screens,
            passProps: {
              ...passProps
            },
            options: {
              statusBar: {
                drawBehind: true,
                visible: false,
                backgroundColor: 'transparent',
                style: 'dark'
              },
              layout: {
                backgroundColor: 'transparent',
                componentBackgroundColor: 'transparent'
              },
              modalPresentationStyle:
                OptionsModalPresentationStyle.overCurrentContext,
              topBar: {
                visible: false,
                height: 0
              },
              bottomTabs: {
                visible: false,
                drawBehind: true
              },
              blurOnUnmount: true
            }
          }
        }
      ]
    }
  });
}

export function startLogin() {
  Storage.CurrentScreenStackId = APP_STACK_ID.OnBoarding;
  Navigation.setRoot(layoutAuthenticate);
}

export function startOnBoarding() {
  Storage.CurrentScreenStackId = APP_STACK_ID.OnBoarding;
  Navigation.setRoot(layoutAuthenticate);
}

export function startApp(startAppCallback?: CallbackFunction) {
  Storage.CurrentScreenStackId = APP_STACK_ID.Feed;
  Navigation.setRoot(layoutRoot)
    .then(async () => {
      startAppCallback?.();
    })
    .catch((e: any) => {
      console.log(e);
    });
}

export function backToTabRoot(tabIndex = 0) {
  if (tabIndex === 0) {
    Storage.CurrentScreenStackId = APP_STACK_ID.Feed;
  }
  Navigation.mergeOptions(TAB_ROOT_ID, {
    bottomTabs: {
      currentTabIndex: tabIndex
    }
  });
}
