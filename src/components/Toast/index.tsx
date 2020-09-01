import React, {PureComponent} from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import {ComponentEvent, Navigation} from 'react-native-navigation';

export const DURATION = {
  LENGTH_SHORT: 2000,
  FOREVER: 0
};

const {height} = Dimensions.get('window');

type Props = ComponentEvent & {
  style?: ViewStyle;
  textStyle?: TextStyle;
  position?: 'top' | 'center' | 'bottom';
  defaultCloseDelay?: number;
  fadeOutDuration?: number;
  fadeInDuration?: number;
  positionValue?: number;
  opacity?: number;
  message: string;
};

type State = {
  text: string;
  opacityValue: Animated.Value;
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    elevation: 999,
    alignItems: 'center'
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 4
  },
  defaultText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    textAlign: 'center'
  },
  text: {
    color: 'white'
  }
});

export default class Toast extends PureComponent<Props, State> {
  static defaultProps = {
    position: 'bottom',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 0.8
  };

  private duration = DURATION.LENGTH_SHORT;
  private timer?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = {
      text: this.props.message,
      opacityValue: new Animated.Value(this.props.opacity!)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacityValue, {
      toValue: this.props.opacity!,
      duration: this.props.fadeInDuration,
      useNativeDriver: true
    }).start(() => {
      this.close(this.duration);
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  close = (duration?: number) => {
    let delay = typeof duration === 'undefined' ? this.duration : duration;

    if (delay === DURATION.FOREVER) {
      delay = this.props.defaultCloseDelay || 1000;
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      Animated.timing(this.state.opacityValue, {
        toValue: 0.0,
        duration: this.props.fadeOutDuration,
        useNativeDriver: true
      }).start(() => {
        Navigation.dismissOverlay(this.props.componentId);
      });
    }, delay);
  };

  render() {
    let pos;
    switch (this.props.position) {
      case 'top':
        pos = this.props.positionValue!;
        break;
      case 'center':
        pos = height / 2;
        break;
      case 'bottom':
        pos = height - this.props.positionValue!;
        break;
      default:
        pos = 0;
        break;
    }

    return (
      <KeyboardAvoidingView>
        <View pointerEvents="none" style={[styles.container, {top: pos - 0}]}>
          <Animated.View
            style={[
              styles.content,
              {opacity: this.state.opacityValue},
              this.props.style
            ]}>
            {React.isValidElement(this.state.text) ? (
              this.state.text
            ) : (
              <Text style={[styles.defaultText, this.props.textStyle]}>
                {this.state.text}
              </Text>
            )}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
