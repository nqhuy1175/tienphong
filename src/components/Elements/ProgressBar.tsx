import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  loading?: boolean;
  style?: ViewStyle;
  color?: string;
  size?: number;
};

export const ProgressBar: React.FC<Props> = (props) =>
  useMemo(() => {
    return (
      <View style={[styles.progressBar, {...props.style}]}>
        {props.loading ? (
          <ActivityIndicator
            style={{backgroundColor: 'transparent'}}
            color={props.color}
            size={props.size}
          />
        ) : null}
      </View>
    );
  }, [props.loading]);

ProgressBar.defaultProps = {
  size: 24,
  color: '#6c7b8d',
  loading: true
};

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
