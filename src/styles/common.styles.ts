import {Colors} from '@styles/colors';
import {TextStyle} from 'react-native';

const FONT_SIZE_SSMALL = 8;
const FONT_SIZE_EXSMALL = 10;
const FONT_SIZE_SMALL = 12;
const FONT_SIZE_MEDIUM = 14;
const FONT_SIZE_LARGE = 16;
const FONT_SIZE_EXLARGE = 22;

const fontLight: TextStyle = {
  fontFamily: 'SFProText-Light'
};
const font: TextStyle = {
  fontFamily: 'SFProText-Regular'
};
const fontBold: TextStyle = {
  fontFamily: 'SFProText-Semibold'
};

export const label: TextStyle = {
  ...fontBold,
  fontSize: FONT_SIZE_LARGE,
  color: Colors.black,
  lineHeight: FONT_SIZE_LARGE * 1.5
};

export const subLabel: TextStyle = {
  ...fontBold,
  fontSize: FONT_SIZE_SMALL,
  color: Colors.lightslategray,
  lineHeight: FONT_SIZE_SMALL * 1.4
};

export const text: TextStyle = {
  ...font,
  fontSize: FONT_SIZE_MEDIUM,
  lineHeight: FONT_SIZE_MEDIUM * 1.5,
  color: Colors.black
};

export const textSmall: TextStyle = {
  ...font,
  fontSize: FONT_SIZE_SMALL,
  lineHeight: FONT_SIZE_SMALL * 1.4,
  color: Colors.black
};

export const textExSmall: TextStyle = {
  ...font,
  fontSize: FONT_SIZE_EXSMALL,
  lineHeight: FONT_SIZE_EXSMALL * 1.3,
  color: Colors.black
};

export const subText: TextStyle = {
  ...font,
  fontSize: FONT_SIZE_SMALL,
  lineHeight: FONT_SIZE_SMALL * 1.4,
  color: Colors.lightslategray
};

export const textBold: TextStyle = {
  ...fontBold,
  fontSize: FONT_SIZE_MEDIUM,
  lineHeight: FONT_SIZE_MEDIUM * 1.5,
  color: Colors.black
};

export const common = {
  subLabel,
  label,
  font,
  fontBold,
  fontLight,
  FONT_SIZE_MEDIUM,
  FONT_SIZE_SMALL,
  FONT_SIZE_EXSMALL,
  FONT_SIZE_SSMALL,
  FONT_SIZE_LARGE,
  FONT_SIZE_EXLARGE,
  text,
  subText,
  textSmall,
  textExSmall,
  textBold
};
