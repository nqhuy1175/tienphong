import {Screens} from '@screens/Screens';
import {APP_STACK_ID, TAB_ROOT_ID} from '@utils/enum';
import {isArray, isString} from 'lodash';
import {Layout, LayoutRoot, Options} from 'react-native-navigation/lib/dist';

type CompIdOrLayout = string | Layout;

const stack = (
  rawChildren: CompIdOrLayout | CompIdOrLayout[],
  id?: string
): Layout => {
  const childrenArray = isArray(rawChildren) ? rawChildren : [rawChildren];
  const children = childrenArray.map((child) => component(child));
  return {stack: {children, id}};
};

const component = <P = {}>(
  compIdOrLayout: CompIdOrLayout,
  options?: Options,
  passProps?: P
): Layout<P> => {
  return isString(compIdOrLayout)
    ? {component: {name: compIdOrLayout, options, passProps}}
    : (compIdOrLayout as Layout<P>);
};

const layoutAuthenticate: LayoutRoot = {
  root: {
    stack: {
      id: APP_STACK_ID.Login,
      children: [
        {
          component: {
            name: Screens.SocialAuth,
            options: {
              statusBar: {
                drawBehind: true,
                visible: false
              }
            }
          }
        }
      ]
    }
  }
};

const layoutRoot: LayoutRoot = {
  root: {
    bottomTabs: {
      id: TAB_ROOT_ID,
      children: [
        {
          // tab Feed
          stack: {
            id: APP_STACK_ID.Feed,
            children: [
              {
                component: {
                  name: Screens.Feed,
                  options: {
                    layout: {
                      componentBackgroundColor: '#FFF'
                    },
                    topBar: {
                      visible: false,
                      height: 0
                    }
                  }
                }
              }
            ],
            options: {
              sideMenu: {
                left: {
                  enabled: false
                }
              },
              bottomTab: {
                icon: require('../../../assets/tabs/home-heart.png'),
                selectedIcon: require('../../../assets/tabs/home-heart-alt.png'),
                testID: 'FEED_TAB',
                text: 'Trang chủ',
                selectedTextColor: '#01A4FA'
              },
              popGesture: true
            }
          }
        },
        {
          stack: {
            id: APP_STACK_ID.Search,
            children: [
              {
                component: {
                  name: Screens.Search,
                  options: {
                    layout: {
                      componentBackgroundColor: '#FFF'
                    },
                    topBar: {
                      visible: false,
                      height: 0
                    }
                  }
                }
              }
            ],
            options: {
              sideMenu: {
                left: {
                  enabled: false
                }
              },
              bottomTab: {
                icon: require('../../../assets/tabs/search.png'),
                selectedIcon: require('../../../assets/tabs/search-alt.png'),
                testID: 'EXPLORE_TAB',
                text: 'Tìm kiếm',
                selectedTextColor: '#01A4FA'
              },
              popGesture: true
            }
          }
        },
        {
          // tab user-user-profile user-profile
          stack: {
            id: APP_STACK_ID.Notification,
            children: [
              {
                component: {
                  name: Screens.Notification,
                  options: {
                    layout: {
                      componentBackgroundColor: '#FFF'
                    },
                    topBar: {
                      title: {
                        text: 'Thông báo'
                      },
                      height: 50,
                      elevation: 1,
                      visible: true
                    }
                  }
                }
              }
            ],
            options: {
              sideMenu: {
                left: {
                  enabled: false
                }
              },
              bottomTab: {
                icon: require('../../../assets/tabs/bells.png'),
                selectedIcon: require('../../../assets/tabs/bells-alt.png'),
                testID: 'personalTab',
                text: 'Thông báo',
                selectedTextColor: '#01A4FA'
                // dotIndicator: {
                //     visible: true
                // }
              }
            }
          }
        },
        {
          // tab user-user-profile user-profile
          stack: {
            id: APP_STACK_ID.Personal,
            children: [
              {
                component: {
                  name: Screens.Personal,
                  options: {
                    layout: {
                      componentBackgroundColor: '#FFF'
                    },
                    topBar: {
                      title: {
                        text: 'Thông báo'
                      },
                      height: 50,
                      elevation: 1,
                      visible: true
                    }
                  }
                }
              }
            ],
            options: {
              sideMenu: {
                left: {
                  enabled: false
                }
              },
              bottomTab: {
                icon: require('../../../assets/tabs/user.png'),
                selectedIcon: require('../../../assets/tabs/user-alt.png'),
                testID: 'personalTab',
                text: 'Cá nhân',
                selectedTextColor: '#01A4FA'
                // dotIndicator: {
                //     visible: true
                // }
              }
            }
          }
        }
      ],
      options: {
        bottomTabs: {
          backgroundColor: '#ffffff',
          titleDisplayMode: 'alwaysShow',
          tabsAttachMode: 'onSwitchToTab',
          drawBehind: false
        },
        bottomTab: {
          fontFamily: 'SFProText-Regular',
          textColor: '#6B778C',
          fontSize: 12,
          selectedTextColor: '#172B4D',
          selectedFontSize: 12
        }
      }
    }
  }
};

export {stack, component, layoutRoot, layoutAuthenticate};
