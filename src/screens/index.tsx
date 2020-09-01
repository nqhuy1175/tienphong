import {Screens} from '@screens/Screens';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

function registerScreens(Store: any) {
  Navigation.registerComponent(
    Screens.BusyBox,
    () => require('./BusyBox/BusyBox').default
  );
  Navigation.registerComponent(
    Screens.Toast,
    () => require('../components/Toast').default
  );
  Navigation.registerComponent(Screens.Search, () => {
    const Search = require('./Search').default;
    return gestureHandlerRootHOC((props) => (
      <Provider store={Store}>
        <Search {...props} />
      </Provider>
    ));
  });
  Navigation.registerComponent(Screens.Notification, () => {
    const Notification = require('./Notification').default;
    return gestureHandlerRootHOC((props) => (
      <Provider store={Store}>
        <Notification {...props} />
      </Provider>
    ));
  });
  Navigation.registerComponent(Screens.Personal, () => {
    const Personal = require('./Personal').default;
    return gestureHandlerRootHOC((props) => (
      <Provider store={Store}>
        <Personal {...props} />
      </Provider>
    ));
  });

  Navigation.registerComponent(Screens.Feed, () => {
    const Feed = require('./Feed').default;
    return gestureHandlerRootHOC((props) => (
      <Provider store={Store}>
        <Feed {...props} />
      </Provider>
    ));
  });

  Navigation.registerComponent(Screens.SocialAuth, () => {
    const SocialAuth = require('./Login/SocialAuth').default;
    return gestureHandlerRootHOC((props) => (
      <Provider store={Store}>
        <SocialAuth {...props} />
      </Provider>
    ));
  });
  Navigation.registerComponent(Screens.PhoneAuth, () => {
    const PhoneAuth = require('./Login/PhoneAuth').default;
    return gestureHandlerRootHOC((props) => (
      <Provider store={Store}>
        <PhoneAuth {...props} />
      </Provider>
    ));
  });
  Navigation.registerComponent(Screens.Register, () => {
    const Register = require('./Login/Register').default;
    return gestureHandlerRootHOC((props) => (
      <Provider store={Store}>
        <Register {...props} />
      </Provider>
    ));
  });
  /**
   * TODO: all lazy screens put here
   */

  Navigation.setLazyComponentRegistrator((componentName) => {
    console.log('LazyComponentRegistrator', componentName);
    switch (componentName) {
      // case Screens.Register: {
      //   Navigation.registerComponent(Screens.Register, () => {
      //     const Register = require('./Login/Register').default;
      //     return gestureHandlerRootHOC((props) => (
      //       <Provider store={Store}>
      //         <Register {...props} />
      //       </Provider>
      //     ));
      //   });
      //   break;
      // }
      default: {
        break;
      }
    }
  });

  console.info('All screens have been registered...');
}
export {registerScreens};
