import {common} from '@styles/common.styles';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-ui-lib';

class LoginFooter extends PureComponent {
  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.term}>
          Bằng cách tiếp tục, bạn đồng ý với{' '}
          <Text style={common.textBold}>Điều khoản sử dụng</Text> và{' '}
          <Text style={common.textBold}>Chính sách quyền riêng tư</Text> của
          chúng tôi
        </Text>
      </View>
    );
  }
}

export {LoginFooter};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#F4F5F7',
    height: 56,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  term: {
    ...common.text,
    textAlign: 'center'
  }
});
