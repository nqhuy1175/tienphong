import {LoginFooter, LoginHeader} from '@components/Login';
import {FullScreenOptions, showToast, startApp} from '@libs/Navigation';
import Navigator from '@libs/Navigation/Navigation';
import {Storage} from '@modules/storage';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Screens} from '@screens/Screens';
import {common} from '@styles/common.styles';
import config from 'config';
import {debounce} from 'lodash';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {NavigationComponent} from 'react-native-navigation';
import {Button} from 'react-native-ui-lib';

import Facebook from 'assets/icons/facebook.svg';
import Google from 'assets/icons/google.svg';
import Phone from 'assets/icons/mobile-alt.svg';

GoogleSignin.configure({
  webClientId: config.GOOGLE_WEB_CLIENT_ID
});

class SocialAuth extends NavigationComponent<any, any> {
  private readonly debounceFacebookLogin: DebounceFunction;
  private debounceGoogleLogin: DebounceFunction;
  constructor(props: any) {
    super(props);
    this.debounceFacebookLogin = debounce(this.onFacebookButtonPress, 300, {
      leading: true,
      trailing: false
    });
    this.debounceGoogleLogin = debounce(this.onGoogleButtonPress, 300, {
      leading: true,
      trailing: false
    });
  }

  loginSuccess = () => {
    Storage.User = auth().currentUser;
    startApp();
  };

  onFacebookButtonPress = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email'
      ]);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // Sign-in the user with the credential
      const user = await auth().signInWithCredential(facebookCredential);
      if (!user) {
        showToast({message: 'Đăng nhập thất bại!'});
        throw new Error('Something went wrong obtaining access token');
      } else {
        this.loginSuccess();
      }
    } catch (e) {
      console.log(e);
    }
  };

  onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user: FirebaseAuthTypes.UserCredential = await auth().signInWithCredential(
        googleCredential
      );
      if (!user) {
        showToast({message: 'Đăng nhập thất bại!'});
        throw new Error('Something went wrong obtaining access token');
      } else {
        this.loginSuccess();
      }
    } catch (e) {
      console.log(e);
    }
  };

  onPressLoginPhone = () => {
    Navigator.push(
      this.props.componentId,
      Screens.PhoneAuth,
      FullScreenOptions
    );
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <LoginHeader />
        <View style={styles.content}>
          <Button
            onPress={this.debounceFacebookLogin}
            style={styles.button}
            label={'Tiếp tục với Facebook'}
            outline={true}
            iconSource={() => <Facebook width={24} height={24} />}
            labelStyle={styles.label}
          />
          <Button
            onPress={this.onGoogleButtonPress}
            style={styles.button}
            label={'Tiếp tục với Google'}
            outline={true}
            iconSource={() => <Google width={24} height={24} />}
            labelStyle={styles.label}
          />
          <Button
            onPress={this.onPressLoginPhone}
            style={styles.button}
            label={'Sử dụng số điện thoại'}
            outline={true}
            iconSource={() => <Phone width={24} height={24} />}
            labelStyle={styles.label}
          />
        </View>
        <LoginFooter />
      </View>
    );
  }
}

export default SocialAuth;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)'
  },

  content: {
    flex: 1
  },
  button: {
    height: 48,
    borderRadius: 8,
    borderColor: '#EBEAED',
    marginHorizontal: 16,
    marginBottom: 16
  },
  label: {
    ...common.textBold,
    flex: 1,
    marginLeft: 16,
    textAlign: 'center',
    marginRight: 24
  }
});
