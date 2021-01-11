import React from 'react';

import {StyleSheet, View} from 'react-native';

import {padding} from 'src/components/config/spacing';

import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

const Container = function ({disable, style, children, ...rest}) {
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        disable && styles[disable],
        style,
      ])}
      {...rest}>
      {children}
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: padding.large,
  },
  right: {
    paddingRight: 0,
  },
  left: {
    paddingLeft: 0,
  },
  all: {
    paddingHorizontal: 0,
  },
};

export default Container;
