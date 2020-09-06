import {Colors} from '@styles/colors';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import Swiper from 'react-native-swiper';
import {BannerItem} from './BannerItem';

const data: AdsObject[] = [
  {
    endPointId: 0,
    endPointType: 0,
    endPointUrl: '',
    image:
      'https://steba.vn/wp-content/uploads/2016/10/banner-s%E1%BB%B1-ki%E1%BB%87n-m%E1%BB%9Bi-05.jpg',
    id: 0,
    name: ''
  },
  {
    endPointId: 1,
    endPointType: 0,
    endPointUrl: '',
    image: 'https://hoctot.hocmai.vn/wp-content/uploads/2018/07/chotsale.png',
    id: 0,
    name: ''
  }
];
const {width} = Dimensions.get('window');

type OwnProps = {
  bannerRatio: number;
  bannerLocation: number;
  containerStyle?: ViewStyle;
};

type Props = OwnProps;

class Banners extends Component<Props> {
  private readonly bannerWidth: number;
  private readonly bannerHeight: number;
  private readonly listHeight: number;

  constructor(props: Props) {
    super(props);
    this.bannerWidth = width - 32;
    this.bannerHeight = this.bannerWidth * props.bannerRatio;
    this.listHeight = this.bannerHeight + 16;
  }

  onPressBanner = (banner: AdsObject) => {
    console.log('Banner click', banner);
  };

  renderItem = (item: AdsObject, index: number) => {
    return (
      <BannerItem
        banner={item}
        index={index}
        containerStyle={{
          width: this.bannerWidth,
          height: this.bannerHeight
        }}
        bannerStyle={{
          width: this.bannerWidth,
          height: this.bannerHeight
        }}
        bannerLocation={this.props.bannerLocation}
        onPress={this.onPressBanner}
        key={'banner-' + index}
      />
    );
  };

  render() {
    const {containerStyle} = this.props;

    if (data.length === 1) {
      return <View style={containerStyle}>{this.renderItem(data[0], 0)}</View>;
    }
    return (
      <View style={[styles.wrapper, containerStyle]}>
        <Swiper
          bounces={false}
          autoplay={true}
          autoplayTimeout={4}
          loadMinimal={true}
          showsPagination={true}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          paginationStyle={styles.paginationStyle}
          style={{height: this.listHeight}}>
          {data.map(this.renderItem)}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    marginBottom: 8
  },
  activeDotStyle: {
    width: 6,
    height: 6,
    backgroundColor: Colors.deepskyblue
  },
  dotStyle: {
    width: 6,
    height: 6,
    backgroundColor: Colors.lightslategray
  },
  paginationStyle: {
    bottom: 12
  }
});

export {Banners};
