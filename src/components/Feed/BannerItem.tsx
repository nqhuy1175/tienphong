import {isNullOrEmpty} from '@utils/Lang';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  onPress?: CallbackFunction;
  banner: AdsObject;
  index: number;
  bannerLocation?: number;
  containerStyle?: ViewStyle;
  bannerStyle?: ImageStyle;
  screenContentTitle?: string;
  screenContentId?: string | number;
};

export class BannerItem extends PureComponent<Props> {
  static defaultProps = {
    bannerLocation: 0,
    screenContentTitle: '',
    screenContentId: ''
  };

  onPressBanner = () => {
    this.props.onPress?.(this.props.banner);
  };

  render() {
    const {banner, bannerStyle, containerStyle, onPress} = this.props;
    const image = _.get(banner, 'image', '');
    if (isNullOrEmpty(image)) return null;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={typeof onPress === 'undefined'}
        style={[styles.shopBannerItem, {...containerStyle}]}
        onPress={_.debounce(this.onPressBanner, 300, {
          leading: true,
          trailing: false
        })}>
        <FastImage
          // resizeMode={'stretch'}
          source={{uri: image}}
          style={[styles.shopBannerImage, {...bannerStyle}]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  shopBannerItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8
    // ...Platform.select({
    //   ios: {
    //     shadowRadius: 2,
    //     shadowOpacity: 0.2,
    //     // shadowColor: 'r3gba(255, 89, 144, 0.28)',
    //     shadowColor: 'black',
    //     shadowOffset: {width: 2, height: 2}
    //   },
    //   android: {
    //     elevation: 2
    //   }
    // })
  },
  shopBannerImage: {
    borderRadius: 10
  }
});
