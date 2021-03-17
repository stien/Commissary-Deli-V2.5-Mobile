import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions,SafeAreaView,StyleSheet,View, Text, Image} from 'react-native';

import Home from 'src/screens/home';

import Sidebar from 'src/containers/Sidebar';

import {homeDrawer} from 'src/config/navigator';
import DeliMeat from '../screens/home/containers/DeliMeat/DeliMeat';
import { mainStack } from '../config/navigator';

import { NotifierWrapper, Easing, NotifierComponents, Notifier } from 'react-native-notifier';
import { clearCart } from '../modules/cart/actions';
import {  useDispatch } from 'react-redux';
// import {resetTimer} from './resetTimer'
const Drawer = createDrawerNavigator();
const {width} = Dimensions.get('window');

const WIDTH_DRAWER = width * 0.78;

const drawerStyle = {
  width: WIDTH_DRAWER,
};

export default function HomeDrawer({navigation}) {

  const dispatch = useDispatch()

  resetTimer = (noty) => {
    clearInterval(this.timer);
    currSeconds = 0;

    if (noty == false){
    this.timer = setInterval(startIdleTimerNoNOty, 15000);

    } else {
    this.timer = setInterval(startIdleTimer, 15000);
    }
  };
  startIdleTimer = () => {
    currSeconds++;
    console.log(currSeconds);

    if (currSeconds == 800) {

      Notifier.showNotification({
        title: "Need more time, still undecided?",
        description: "SAVE MY CART AND CONTINUE",
        duration: 0,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log("reset timer"),
        onPress: () => resetTimer(),
        hideOnPress: true,
        Component: CustomComponent,
         
      });
    }

    if (currSeconds > 900) {
      {
        Notifier.hideNotification();
        dispatch(clearCart());
        navigation.navigate(homeDrawer.home);
        resetTimer(false);
      }
    }
  };
  startIdleTimerNoNOty = () => {
    currSeconds++;
    console.log(currSeconds);

    if (currSeconds > 800) {
      {
        Notifier.hideNotification();
        dispatch(clearCart());
        navigation.navigate(homeDrawer.home);
        resetTimer(false);
      }
    }
  };
resetTimer(false)
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName={homeDrawer.home}
      screenOptions={{headerShown: false}}
      drawerStyle={drawerStyle}>
      <Drawer.Screen name={homeDrawer.home} component={Home} />
      {/*} <Drawer.Screen name={mainStack.DeliMeat} component={DeliMeat} /> */}
    </Drawer.Navigator>
  );
}

const CustomComponent = ({ title, description }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
       <Image
            source={ require('src/assets/images/noty-logo.png') }
            style={styles.img}
          />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'orange',
  },
  container: {
    padding: 50,
  },
  title: { color: 'white', fontWeight: 'bold', fontSize:40 , paddingBottom: 20, marginTop: 20},
  description: { color: 'white', borderRadius: 30, backgroundColor:'#5c7feb', fontWeight:'bold', padding:20, width: 400, textAlign:'center', fontSize:20  },
  img: { alignSelf: 'flex-end', marginTop: -100, width: 150},
});