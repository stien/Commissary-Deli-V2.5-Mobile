import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeDrawer from './home-drawer';
import Me from 'src/screens/profile/me';
import Cart from 'src/screens/cart/cart';
import Category from 'src/screens/shop/category';
import Wishlist from 'src/screens/wishlist';
import Tabbar from 'src/containers/Tabbar';
import { connect } from 'react-redux';

import {homeTabs} from 'src/config/navigator';
import { isLoginSelector } from '../modules/auth/selectors';

const Tab = createBottomTabNavigator();

function HomeTabs({isLogin}) {
  return (
    <Tab.Navigator tabBar={(props) => <Tabbar {...props} />}>
      <Tab.Screen name={homeTabs.home_drawer} component={HomeDrawer} />
      <Tab.Screen name={homeTabs.cart} component={Cart} />
      <Tab.Screen name={homeTabs.me} component={isLogin ? HomeDrawer : Me} />
    </Tab.Navigator>
  );
}


const mapStateToProps = (state) => {
  return {
    isLogin: isLoginSelector(state),
  };
};

export default connect(mapStateToProps)(HomeTabs);