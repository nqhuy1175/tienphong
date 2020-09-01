import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import TextTicker from 'react-native-text-ticker';

import {dataStorage} from '@modules/storage';
import {ADS_TYPE} from '@utils/enum';
import {scale} from '@utils/Scale';
import {debounce, get, isEqual} from 'lodash';
import now from 'performance-now';
import firebase from 'react-native-firebase';
import * as common from '../../../styles/common.style';

import {GlobalState} from '@redux/types';
import {directAds} from '@utils/Direction';
import {connect, ConnectedProps} from 'react-redux';

const overlayWidth = 40;

const mapStateToProps = (state: GlobalState) => state.textLink;

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

class TextLink extends Component<Props> {
  private initialTrace = true;
  private initialTime?: number;
  private traceLoading = firebase
    .perf()
    .newTrace('ec_home_text_link_box_load_data');

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextState: Readonly<{}>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextContext: any
  ): boolean {
    return (
      this.props.isLoading &&
      !nextProps.isLoading &&
      !isEqual(this.props.data, nextProps.data)
    );
  }

  async componentDidMount() {
    this.initialTime = now();
    await this.traceLoading.start();
  }

  async componentWillUnmount() {
    await this.traceLoading.stop();
  }

  getSnapshotBeforeUpdate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prevProps: Readonly<Props>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prevState: Readonly<{}>
  ): any | null {
    return {
      startTime: now()
    };
  }

  async componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any
  ) {
    const updatedTime = now();
    if (this.initialTrace) {
      this.initialTrace = false;
      // console.log('loadingUpdateTime: ', updatedTime - this.initialTime!);
      await this.traceLoading.putAttribute(
        'user_id',
        dataStorage.user?.id + ''
      );
      await this.traceLoading.putMetric(
        'run_time',
        (updatedTime - this.initialTime!) / 1000
      );
      await this.traceLoading.putMetric(
        'update_time',
        (updatedTime - snapshot.startTime) / 1000
      );
      await this.traceLoading.stop();
    }
  }

  onPress = () =>
    directAds(
      get(this.props.data, 'endPointType', ADS_TYPE.popUp),
      get(this.props.data, 'endPointId', 0),
      get(this.props.data, 'name', ''),
      get(this.props.data, 'endPointUrl', ''),
      get(this.props.data, 'courseId', 0),
      get(this.props.data, 'popup.product', {})
    );

  render() {
    const text = get(this.props.data, 'content', null);
    if (!text) return null;
    const duration = text.length * 150;
    return (
      <FastImage
        style={styles.container}
        source={require('../../../../assets/icons/feed/boxText.webp')}>
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={debounce(this.onPress, 300, {
            leading: true,
            trailing: false
          })}
          style={styles.overlayView}
        />
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
    color: 'white'
  },
  overlayView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});

export default connector(TextLink);
