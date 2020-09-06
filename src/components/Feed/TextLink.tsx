import {common} from '@styles/common.styles';
import {scale} from '@utils/Scale';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextTicker from 'react-native-text-ticker';

const overlayWidth = 40;

class TextLink extends PureComponent {
  onPress = () => {
    console.log('TextLink click');
  };

  render() {
    const text = 'Sim số phong thủy đẹp tuyệt vời đây =)))';
    if (!text) return null;
    const duration = text.length * 150;
    return (
      <FastImage
        style={styles.container}
        source={require('assets/images/feed/TextAds.webp')}>
        <TextTicker
          style={styles.text}
          duration={duration}
          loop
          repeatSpacer={50}
          marqueeDelay={3000}
          bounce={false}
          shouldAnimateTreshold={overlayWidth}
          isRTL>
          {text}
        </TextTicker>
        {/*<TouchableOpacity*/}
        {/*  activeOpacity={0.8}*/}
        {/*  onPress={debounce(this.onPress, 300, {*/}
        {/*    leading: true,*/}
        {/*    trailing: false*/}
        {/*  })}*/}
        {/*  style={styles.overlayView}*/}
        {/*/>*/}
      </FastImage>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 36,
    paddingLeft: 16,
    paddingTop: scale(6)
  },
  text: {
    ...common.textBold,
    color: 'white',
    textAlign: 'center'
  },
  overlayView: {
    ...StyleSheet.absoluteFillObject
  }
});

export {TextLink};
