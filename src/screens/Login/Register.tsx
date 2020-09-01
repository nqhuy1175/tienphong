import {LoginHeader} from '@components/Login';
import {showModal, startApp} from '@libs/Navigation';
import {Storage} from '@modules/storage';
import {utils} from '@react-native-firebase/app';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {Screens} from '@screens/Screens';
import {Colors} from '@styles/colors';
import {common} from '@styles/common.styles';
import {isEmail} from '@utils/Lang';
import {isEmpty, trim} from 'lodash';
import React, {RefObject} from 'react';
import {StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {
  Navigation,
  NavigationComponent,
  NavigationComponentProps,
  Options
} from 'react-native-navigation';
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS
} from 'react-native-permissions';
import {
  Avatar,
  Button,
  KeyboardAwareScrollView,
  TextField
} from 'react-native-ui-lib';

type Props = NavigationComponentProps & {
  user: FirebaseAuthTypes.UserCredential;
};

type State = {
  validName: boolean;
  validEmail: boolean;
  emailError: string;
  avatarSource: {uri: string};
  cameraGranted: boolean;
  galleryGranted: boolean;
};

class Register extends NavigationComponent<Props, State> {
  static options = (): Options => {
    return {
      topBar: {
        title: {
          text: 'Đăng kí tài khoản'
        },
        visible: true,
        height: 50
      }
    };
  };

  UserCredential: FirebaseAuthTypes.UserCredential;
  name?: string;
  email?: string;

  private _name?: RefObject<typeof TextField>;
  private _email?: RefObject<typeof TextField>;
  private avatar: FirebaseStorageTypes.Reference;

  constructor(props: Props) {
    super(props);
    this.state = {
      validName: false,
      validEmail: false,
      emailError: '',
      avatarSource: {uri: ''},
      cameraGranted: false,
      galleryGranted: false
    };
    this.UserCredential = props.user;
    this.avatar = storage().ref(
      `users/${this.UserCredential.user.uid}/${this.UserCredential.user.uid}.png`
    );
  }

  componentDidMount() {
    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    ]).then((statuses) => {
      console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
      console.log(
        'Gallery',
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
      );
      const permissions: any[] = [];
      if (statuses[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED) {
        permissions.push(PERMISSIONS.ANDROID.CAMERA);
      }
      if (
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !== RESULTS.GRANTED
      ) {
        permissions.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }
      if (!isEmpty(permissions)) {
        requestMultiple(permissions).then((results) => {
          console.log('Camera', results[PERMISSIONS.ANDROID.CAMERA]);
          console.log(
            'FaceID',
            results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
          );
        });
      }
    });
  }

  onChangeName = (name: string) => {
    this.name = name;
    const validName = !isEmpty(trim(name));
    if (validName !== this.state.validName) {
      console.log(validName);
      this.setState({
        validName
      });
    }
  };

  onChangeEmail = (email: string) => {
    this.email = email;
    const validMail = isEmail(email);
    if (validMail !== this.state.validEmail) {
      console.log(validMail);
      this.setState({
        validEmail: validMail
      });
    }
  };

  onPressAvatar = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(utils.FilePath);
        // const firePath = `${utils.FilePath.PICTURES_DIRECTORY}/${response.fileName}`;
        const task = this.avatar.putFile(response.path!);

        task.on('state_changed', (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
          );
        });

        task.then(() => {
          console.log('Image uploaded to the bucket!');
        });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  updateUserInfo = async () => {
    showModal(Screens.BusyBox);
    await this.UserCredential.user.updateEmail(this.email!);
    await this.UserCredential.user.updateProfile({
      displayName: this.name,
      photoURL: await this.avatar.getDownloadURL()
    });
    Storage.User = auth().currentUser;
    await Navigation.dismissModal(Screens.BusyBox);
    startApp();
  };

  render() {
    // if (!this.UserCredential) return null;
    const {validName, validEmail} = this.state;
    console.log('validName', validName);
    console.log('validEmail', validEmail);
    return (
      <KeyboardAwareScrollView
        style={styles.wrapper}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        getTextInputRefs={() => {
          return [this._name, this._email];
        }}>
        <LoginHeader />
        <View style={styles.content}>
          <Avatar
            label={'TP'}
            size={80}
            onPress={this.onPressAvatar}
            containerStyle={styles.avatar}
            source={this.state.avatarSource}
          />
          <TextField
            ref={(ref: any) => (this._name = ref)}
            onChangeText={this.onChangeName}
            style={common.text}
            prefixStyle={common.text}
            underlineColor={Colors.deepskyblue}
            placeholder={'Họ tên'}
            // error={this.state.phoneError}
            floatingPlaceholder={true}
          />
          <TextField
            ref={(ref: any) => (this._email = ref)}
            onChangeText={this.onChangeEmail}
            style={common.text}
            prefixStyle={common.text}
            underlineColor={Colors.deepskyblue}
            placeholder={'Email'}
            keyboardType={'email-address'}
            // error={this.state.phoneError}
            floatingPlaceholder={true}
          />
          <Button
            onPress={this.updateUserInfo}
            label={'Tiếp tục'}
            style={styles.button}
            disabled={!validName || !validEmail}
            disabledBackgroundColor={Colors.lightslategray}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Register;

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
  },
  button: {
    height: 48
  },
  avatar: {
    alignSelf: 'center'
  }
});
