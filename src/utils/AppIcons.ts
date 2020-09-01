import Ionicons from 'react-native-vector-icons/Ionicons';

const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons: ObjectType = {
  'ios-share': ['Ionicons', 24, '#6B778C'],
  'md-close': ['Ionicons', 24, '#6B778C'],
  'ios-menu': ['Ionicons', 24, '#6B778C'],
  'md-menu': ['Ionicons', 24, '#6B778C']
};

const iconsMap: ObjectType = {};

const iconsLoader = new Promise((resolve) => {
  const processListIcons: any[] = [];
  Object.keys(icons).map((iconName) => {
    processListIcons.push(
      Ionicons.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][1],
        icons[iconName][2]
      )
    );
  });
  Promise.all(processListIcons).then((sources) => {
    Object.keys(icons).forEach(
      (iconName, idx) => (iconsMap[iconName] = sources[idx])
    );

    // Call resolve (and we are done)
    resolve(true);
  });
});

export {iconsMap, iconsLoader};
