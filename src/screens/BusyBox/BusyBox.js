import React, {Component} from 'react';
import {ProgressBar} from '@components/Elements';
import {View} from 'react-native';

export default class BusyBox extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(23,43,77,0.4)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <ProgressBar color={'#FFF'} />
      </View>
    );
  }
}
