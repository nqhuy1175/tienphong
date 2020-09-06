import {Colors} from '@styles/colors';
import {common} from '@styles/common.styles';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Redo from 'assets/icons/redo-alt.svg';
import ShipFast from 'assets/icons/shipping-fast.svg';
import ThumbUp from 'assets/icons/thumbs-up.svg';

class HomePolicy extends PureComponent {
  renderBox = (title: string) => (
    <View style={styles.textContainer}>
      <Text numberOfLines={2} style={styles.text}>
        {title}
      </Text>
    </View>
  );

  render() {
    return (
      <View style={styles.policy}>
        <View style={styles.policyItem}>
          <ThumbUp width={20} height={20} />
          {this.renderBox('100% \nchính hãng')}
        </View>

        <View style={styles.border} />
        <View style={styles.middle}>
          <ShipFast width={20} height={20} />
          {this.renderBox('Giao hàng nhanh\ntoàn quốc')}
        </View>
        <View style={styles.border} />
        <View style={styles.policyItem}>
          <Redo width={20} height={20} />
          {this.renderBox('Đổi trả\nlinh hoạt')}
        </View>
      </View>
    );
  }
}

export {HomePolicy};

const styles = StyleSheet.create({
  policy: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#ffffff'
  },
  policyItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16
  },
  middle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  border: {
    marginVertical: 16,
    width: 1,
    backgroundColor: Colors.lightslategray
  },
  textContainer: {
    marginLeft: 8
  },
  text: {
    ...common.textExSmall,
    color: '#0A9528',
    textAlign: 'center'
  },
  icon: {
    marginLeft: 16,
    marginRight: 0
  }
});
