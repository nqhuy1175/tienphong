import {debounce} from 'lodash';
import React, {PureComponent} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

import ChevronCircleLeft from 'assets/icons/chevron-circle-left.svg';
import Search from 'assets/icons/search.svg';
import IconTimes from 'assets/icons/times.svg';

import {Colors} from '@styles/colors';
import {common} from '@styles/common.styles';

const screenSize = Dimensions.get('window');

type Props = {
  searchBoxStyle?: ViewStyle;
  style?: ViewStyle;
  editable: boolean;
  backIcon: boolean;
  autoFocus: boolean;
  searchText: string;
  placeholder: string;
  renderRightSection?: CallbackFunction;
  onPressClearSearch?: CallbackFunction;
  onSearchTextChange?: CallbackFunction;
  onSubmitSearch?: CallbackFunction;
  onPressBack?: CallbackFunction;
};

type State = Pick<Props, 'searchText'>;

export class SearchBar extends PureComponent<Props, State> {
  static defaultProps = {
    backIcon: true,
    editable: true,
    autoFocus: true,
    placeholder: 'Tìm kiếm ...'
  };

  private searchInputRef?: TextInput | null;
  private readonly debounceClearSearch: DebounceFunction;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: props.searchText
    };
    this.debounceClearSearch = debounce(this.onPressClearSearch, 300, {
      leading: true,
      trailing: false
    });
  }

  clear = () => this.searchInputRef?.clear();

  focus = () => this.searchInputRef?.focus();

  blur = () => this.searchInputRef?.blur();

  setSearchText = (text: string) => {
    this.setState({
      searchText: text
    });
  };

  onSearchTextChange = (text: string) => {
    this.setState({
      searchText: text
    });
    this.props.onSearchTextChange?.(text);
  };

  onPressClearSearch = () => {
    this.clear();
    this.setState(
      {
        searchText: ''
      },
      this.focus
    );
    this.props.onPressClearSearch?.();
  };

  onSubmitSearch = () => this.props.onSubmitSearch?.();

  onPressBack = () => this.props.onPressBack?.();

  render() {
    return (
      <View
        style={[
          styles.searchContainer,
          {paddingLeft: this.props.backIcon ? 0 : 16},
          {...this.props.style}
        ]}>
        {this.props.backIcon ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.onPressBack}
            style={styles.viewBackIcon}>
            <ChevronCircleLeft width={24} height={24} />
          </TouchableOpacity>
        ) : null}
        <View
          style={[styles.searchInputContainer, {...this.props.searchBoxStyle}]}>
          {!this.state.searchText ? (
            <View style={styles.searchIconLeft}>
              <Search width={18} height={18} />
            </View>
          ) : (
            <View style={styles.viewDummy} />
          )}
          <TextInput
            autoCorrect={false}
            autoFocus={this.props.autoFocus}
            editable={this.props.editable}
            ref={(ref) => (this.searchInputRef = ref)}
            style={styles.searchInput}
            returnKeyType={'search'}
            blurOnSubmit={true}
            // value={this.state.searchText}
            keyboardType={'phone-pad'}
            onSubmitEditing={this.onSubmitSearch}
            onChangeText={this.onSearchTextChange}
            placeholderTextColor={Colors.lightslategray}
            placeholder={this.props.placeholder}
          />
          {this.state.searchText.length > 0 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.searchInputIcon}
              onPress={this.debounceClearSearch}>
              <IconTimes width={14} height={14} />
            </TouchableOpacity>
          ) : null}
        </View>
        {this.props.renderRightSection?.()}
      </View>
    );
  }
}
// keytool -exportcert -alias androiddebugkey -keystore "C:\Users\HL2020\WebstormProjects\SimTienPhong\android\app\debug.keystore" | "C:\Users\HL2020\AppData\Local\openssl\bin\openssl" sha1 -binary | "C:\Users\HL2020\AppData\Local\openssl\bin\openssl" base64
// keytool -exportcert -alias my-key-alias -keystore "C:\Users\HL2020\WebstormProjects\SimTienPhong\android\my-upload-key.keystore" | "C:\Users\HL2020\AppData\Local\openssl\bin\openssl" sha1 -binary | "C:\Users\HL2020\AppData\Local\openssl\bin\openssl" base64

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  viewDummy: {
    width: 14
  },
  searchContainer: {
    flexDirection: 'row',
    width: screenSize.width,
    // backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.lightslategray,
    paddingRight: 16,
    height: 48,
    justifyContent: 'center'
  },
  viewBackIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16
  },
  iconBack: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.lavenderblush
  },
  searchInputContainer: {
    flex: 1,
    height: 32,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#F4F5F7',
    borderRadius: 16
  },
  searchInput: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    ...common.text
  },
  searchIconLeft: {
    alignSelf: 'center',
    marginRight: 9,
    marginLeft: 15
  },
  searchInputIcon: {
    alignSelf: 'center',
    marginHorizontal: 16
  }
});
