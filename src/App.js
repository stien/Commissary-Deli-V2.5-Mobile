/**
 *
 * Main app
 *
 * App Name:          Commissary Deli
 * Author:            einStien
 *
 * @since             2.0.0
 *
 * @format
 * @flow
 */

import React, {Component, useState} from 'react';
import OneSignal from 'react-native-onesignal';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {APP_ID} from './config/onesignal';
import './config-i18n';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppRouter from './AppRouter';

import NavigationService from 'src/utils/navigation';

import configureStore from './config-store';
import {getDemoSelector} from './modules/common/selectors';
import {tokenSelector} from './modules/auth/selectors';
import demoConfig from './utils/demo';
import globalConfig from './utils/global';
import { NotifierWrapper, Easing, NotifierComponents, Notifier } from 'react-native-notifier';
import { clearCart } from 'src/modules/cart/actions';
import { mainStack, homeTabs } from "src/config/navigator";
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
const {store, persistor} = configureStore();
type Props = {};

class App extends Component<Props> {

  componentDidMount() {

    OneSignal.init(APP_ID);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    store.subscribe(() => {
      const state = store.getState();
      demoConfig.setData(getDemoSelector(state).toJS());
      globalConfig.setToken(tokenSelector(state));
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }


  render() {  
    return (

      <NavigationContainer
        ref={(navigationRef) =>
          NavigationService.setTopLevelNavigator(navigationRef)
        }>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <NotifierWrapper>
              <AppRouter />
              </NotifierWrapper>
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    );

      }
}   
    const styles = StyleSheet.create({
      safeArea: {
        backgroundColor: 'orange',
      },
      container: {
        padding: 50,
      },
      title: { color: 'white', fontWeight: 'bold', fontSize:40 , paddingTop: 20, paddingBottom: 20},
      description: { color: 'white', borderRadius: 30, backgroundColor:'#5c7feb', fontWeight:'bold', padding:20, width: 400, textAlign:'center', fontSize:20  },
    });
    const CustomComponent = ({ title, description }) => (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </SafeAreaView>
    );
export default App;
