import {Navigation} from 'react-native-navigation';

export default function addLayoutProcessors() {
  eventsProcessor();
  layoutProcessor();
}

function layoutProcessor() {
  Navigation.addLayoutProcessor((layout, commandName) => {
    console.log(commandName, layout);
    return layout;
  });
}

function eventsProcessor() {
  // Navigation.events().registerBottomTabSelectedListener(
  //   ({selectedTabIndex, unselectedTabIndex}) => {
  //     switch (selectedTabIndex) {
  // case 0:
  //   Storage.currentScreenStackId = APP_STACK_ID.Feed;
  //   break;
  // case 1:
  //   Storage.currentScreenStackId = APP_STACK_ID.Search;
  //   break;
  // case 2:
  //   Storage.currentScreenStackId = APP_STACK_ID.ecommerce;
  //   break;
  // case 3: {
  //   if (isLogin()) {
  //     Storage.currentScreenStackId = APP_STACK_ID.notification;
  //     Navigator.mergeOptions(APP_STACK_ID.notification, {
  //       bottomTab: {
  //         badge: undefined,
  //         dotIndicator: {
  //           visible: false
  //         }
  //       }
  //     });
  //   } else {
  //     showLogin();
  //     Navigation.mergeOptions(TAB_ROOT_ID, {
  //       bottomTabs: {
  //         currentTabIndex: unselectedTabIndex
  //       }
  //     });
  //   }
  //   break;
  // }
  // case 4: {
  //   if (isLogin()) {
  //     Storage.currentScreenStackId = APP_STACK_ID.profile;
  //   } else {
  //     showLogin();
  //     Navigation.mergeOptions(TAB_ROOT_ID, {
  //       bottomTabs: {
  //         currentTabIndex: unselectedTabIndex
  //       }
  //     });
  //   }
  //   break;
  // }
  //       default:
  //         break;
  //     }
  //   }
  // );
}
