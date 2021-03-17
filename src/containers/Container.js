import React, { useRef, useState, useEffect  }  from 'react';

import { AppState, StyleSheet, Text, View, Linking } from 'react-native';

import {padding} from 'src/components/config/spacing';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const Container = function ({disable, style, children, ...rest}) {

   const appState = useRef(AppState.currentState);
   const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

    const uri  = 'commissarydeli://';
    const _handleAppStateChange = (nextAppState) => {

    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // alert("App has come to the foreground!");
    } else {

       setTimeout(() => {
           {

       Linking.openURL( 'commissarydeli://app' )
       
          }
    }, 3000)

    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };
   

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
