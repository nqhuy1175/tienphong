import {common} from '@styles/common.styles';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-lib';
import Logo from '../../../assets/images/login/logo.svg';

class LoginHeader extends Component<any, any> {
  render() {
    return (
      <View style={styles.header}>
        <Logo width={224} height={35} />
        <Text style={common.text}>Cộng đồng sim số lớn nhất Việt Nam</Text>
      </View>
    );
  }
}

export {LoginHeader};

const styles = StyleSheet.create({
  header: {marginHorizontal: 16, marginVertical: 48}
});
