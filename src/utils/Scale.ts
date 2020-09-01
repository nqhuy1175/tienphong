import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

// tỉ lệ màn hình design
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 750;

const scale = (size: number) => {
  return (width / guidelineBaseWidth) * size;
}; // getWidth
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size; // getHeight screen
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor; // padding

const paddingIOS = Platform.OS === 'ios' ? 'padding' : '';
export {scale, verticalScale, moderateScale, paddingIOS};
