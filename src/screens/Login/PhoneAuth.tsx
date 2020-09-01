import {LoginFooter, LoginHeader} from '@components/Login';
import {
  component,
  FullScreenOptions,
  showModal,
  startApp
} from '@libs/Navigation';
import Navigator from '@libs/Navigation/Navigation';
import {Storage} from '@modules/storage';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Screens} from '@screens/Screens';
import {Colors} from '@styles/colors';
import {common} from '@styles/common.styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {isPhoneNumber} from '@utils/Lang';
import {debounce} from 'lodash';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation, NavigationComponent} from 'react-native-navigation';
import {TextField} from 'react-native-ui-lib';

type State = {
  phoneError: string;
  countDown: number;
  phone: string;
};

class PhoneAuth extends NavigationComponent<{}, State> {
  state = {
    phone: '',
    phoneError: '',
    countDown: 0
  };
  private countDown?: NodeJS.Timeout;
  private confirmation?: FirebaseAuthTypes.ConfirmationResult;

  componentWillUnmount() {
    if (this.countDown) clearInterval(this.countDown);
  }

  changePhone = () => {
    if (this.countDown) clearInterval(this.countDown);
    this.setState({
      countDown: 0,
      phoneError: ''
    });
  };

  signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log(confirmation);
    Navigation.dismissModal(Screens.BusyBox);
    this.confirmation = confirmation;
  };

  verifyOtp = async (code: string) => {
    showModal(Screens.BusyBox);
    try {
      const user = await this.confirmation?.confirm(code);
      console.log(user);
      if (user?.additionalUserInfo?.isNewUser || !user?.user.displayName) {
        Navigation.dismissModal(Screens.BusyBox);
        Navigator.push(
          this.props.componentId,
          component({
            component: {
              name: Screens.Register,
              passProps: {
                user
              },
              options: FullScreenOptions
            }
          })
        );
      } else {
        Storage.User = auth().currentUser;
        Navigation.dismissModal(Screens.BusyBox);
        startApp();
      }
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  onChangeText = (phone: string) => {
    console.log(phone);
    if (phone.length === 9) {
      if (!isPhoneNumber('+84' + phone)) {
        this.setState({
          phoneError: 'Để tiếp tục, Vui lòng nhập số điện thoại hợp lệ'
        });
      } else {
        showModal(Screens.BusyBox);
        this.setState(
          {
            phone: '+84' + phone,
            countDown: 60
          },
          async () => {
            await this.signInWithPhoneNumber('+84' + phone);
            this.countDown = setInterval(() => {
              this.setState({countDown: this.state.countDown - 1});
            }, 1000);
          }
        );
      }
    } else if (this.state.phoneError.length > 0) {
      this.setState({
        phoneError: ''
      });
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <LoginHeader />
        <View style={styles.content}>
          {!this.state.phone && (
            <TextField
              onChangeText={this.onChangeText}
              style={common.text}
              prefixStyle={common.text}
              titleStyle={common.text}
              titleColor={Colors.deepskyblue}
              underlineColor={Colors.deepskyblue}
              keyboardType={'phone-pad'}
              prefix={'(+84)'}
              placeholderTextColor={'#A5ADBB'}
              maxLength={9}
              placeholder={'xx xxx xxx'}
              title={'Số điện thoại'}
              error={this.state.phoneError}
              // floatingPlaceholder={true}
            />
          )}
          {this.state.phone ? (
            <>
              <OTPInputView
                autoFocusOnLoad={true}
                onCodeFilled={this.verifyOtp}
                selectionColor={Colors.deepskyblue}
                pinCount={6}
                style={styles.inputOtp}
                codeInputFieldStyle={styles.codeText}
                codeInputHighlightStyle={{borderColor: Colors.deepskyblue}}
              />
              <View style={styles.row}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={debounce(this.changePhone, 300, {
                    leading: true,
                    trailing: false
                  })}>
                  <Text style={styles.options}>Đổi số điện thoại</Text>
                </TouchableOpacity>
                <View style={styles.row} />
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.options}>
                    Gửi lại Mã({this.state.countDown})
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
        <LoginFooter />
      </View>
    );
  }
}

export default PhoneAuth;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  row: {flexDirection: 'row', flex: 1},
  inputOtp: {height: 56},
  codeText: {borderRadius: 6, ...common.text},
  options: {
    ...common.textBold,
    color: Colors.deepskyblue
  }
});
