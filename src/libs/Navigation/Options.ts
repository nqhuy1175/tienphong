import {iconsMap} from '@utils/AppIcons';
import {Dimensions} from 'react-native';
import {
  AnimationOptions,
  Navigation,
  Options,
  OptionsModalPresentationStyle
} from 'react-native-navigation/lib/dist';

const flags = {
  showTextInputToTestKeyboardInteraction: false,
  useCustomAnimations: false,
  useSlowOpenScreenAnimations: false,
  useSlideAnimation: false
};

const {
  useCustomAnimations,
  useSlowOpenScreenAnimations,
  useSlideAnimation
} = flags;
const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);
const SHOW_DURATION = 250 * (useSlowOpenScreenAnimations ? 2.5 : 1);

const setDefaultOptions = () =>
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait', 'landscape'],
      componentBackgroundColor: '#FFF'
    },
    statusBar: {
      style: 'dark',
      backgroundColor: '#ffffff',
      // translucent: true,
      drawBehind: true
    },
    topBar: {
      animate: true,
      title: {
        fontFamily: 'SFProText-Regular',
        color: '#172b4d',
        fontSize: 16,
        alignment: 'center'
      },
      background: {
        color: 'white'
      },
      height: 50,
      visible: false,
      elevation: 0
    },
    animations: {
      ...(useSlideAnimation
        ? slideAnimations
        : useCustomAnimations
        ? customAnimations
        : {})
    },
    modalPresentationStyle: OptionsModalPresentationStyle.fullScreen
  });

const slideAnimations: AnimationOptions = {
  push: {
    waitForRender: true,
    content: {
      translationX: {
        from: width,
        to: 0,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      },
      alpha: {
        from: 0.7,
        to: 1,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      }
    }
  },
  pop: {
    content: {
      translationX: {
        from: 0,
        to: width,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      },
      alpha: {
        from: 1,
        to: 0.3,
        duration: useSlowOpenScreenAnimations ? SHOW_DURATION : 300
      }
    }
  }
};

const customAnimations: AnimationOptions = {
  showModal: {
    waitForRender: true,
    translationY: {
      from: height,
      to: 0,
      duration: SHOW_DURATION,
      interpolation: 'decelerate'
    },
    alpha: {
      from: 0.65,
      to: 1,
      duration: SHOW_DURATION * 0.7,
      interpolation: 'accelerate'
    }
  },
  dismissModal: {
    translationY: {
      from: 0,
      to: height,
      duration: SHOW_DURATION * 0.9
    }
  },
  push: {
    waitForRender: true,
    content: {
      alpha: {
        from: 0.65,
        to: 1,
        duration: SHOW_DURATION * 0.7,
        interpolation: 'accelerate'
      },
      translationY: {
        from: height * 0.3,
        to: 0,
        duration: SHOW_DURATION,
        interpolation: 'decelerate'
      }
    }
  },
  pop: {
    content: {
      alpha: {
        from: 1,
        to: 0,
        duration: SHOW_DURATION
      },
      translationY: {
        from: 0,
        to: height * 0.7,
        duration: SHOW_DURATION * 0.9
      }
    }
  }
};

const defaultCompOptions = {
  layout: {
    backgroundColor: '#FFF',
    componentBackgroundColor: '#FFF'
  },
  topBar: {
    visible: false,
    height: 0
  },
  sideMenu: {
    left: {
      enabled: false
    }
  },
  bottomTabs: {
    drawBehind: true,
    animate: true,
    visible: false,
    backgroundColor: 'white'
  }
};

const defaultTopBarOptions = {
  topBar: {
    animate: true,
    title: {
      alignment: 'center'
    },
    leftButtons: [
      {
        id: '_GOBACK',
        icon: iconsMap['ic-chevron-left'],
        text: ''
      }
    ],
    height: 50,
    visible: true,
    elevation: 1
  }
};

const SingleScreenOptions: Options = {
  layout: {
    backgroundColor: '#FFF',
    componentBackgroundColor: '#FFF'
  },
  topBar: {
    animate: true,
    title: {
      alignment: 'center'
    },
    leftButtons: [
      {
        id: '_GOBACK',
        icon: require('assets/images/icons/chevron-circle-left.png'),
        text: ''
      }
    ]
  },
  sideMenu: {
    left: {
      enabled: false
    }
  },
  bottomTabs: {
    drawBehind: true,
    animate: true,
    visible: false
  }
};

const FullScreenOptions: Options = {
  layout: {
    backgroundColor: '#FFF',
    componentBackgroundColor: '#FFF'
  },
  statusBar: {
    drawBehind: true,
    visible: false
  },
  topBar: {
    animate: true,
    title: {
      alignment: 'center'
    },
    leftButtons: [
      {
        id: '_GOBACK',
        icon: require('assets/images/icons/chevron-circle-left.png'),
        text: ''
      }
    ]
  },
  sideMenu: {
    left: {
      enabled: false
    }
  },
  bottomTabs: {
    drawBehind: true,
    animate: true,
    visible: false
  }
};

export {
  setDefaultOptions,
  defaultCompOptions,
  defaultTopBarOptions,
  SingleScreenOptions,
  FullScreenOptions
};
