import React,{Component} from 'react';

import {connect} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';

import {ScrollView, View, Dimensions, Text, FlatList ,TouchableOpacity , Image, StyleSheet} from 'react-native';

import {ThemedView, Header} from 'src/components';
import {IconHeader, Logo, CartIcon} from 'src/containers/HeaderComponent';
import ModalHomePopup from 'src/containers/ModalHomePopup';

import {
  dataConfigSelector,
  toggleSidebarSelector,
} from 'src/modules/common/selectors';

// Containers
import Slideshow from './home/containers/Slideshow';
import CategoryList from './home/containers/CategoryList';
import ProductList from './home/containers/ProductList';
import ProductCategory from './home/containers/ProductCategory';
import Banners from './home/containers/Banners';
import TextInfo from './home/containers/TextInfo';
import CountDown from './home/containers/CountDown';
import BlogList from './home/containers/BlogList';
import Testimonials from './home/containers/Testimonials';
import Button from './home/containers/Button';
import Vendors from './home/containers/Vendors';
import Search from './home/containers/Search';
import Divider from './home/containers/Divider';
import Locator from './home/containers/Locator'
import OneSignal from "react-native-onesignal";
import { NotificationUserId } from '../modules/Locator/action';
import action from 'src/utils/action';
import { LocationSelector, setLocationSelector } from '../modules/Locator/selector';
const {width} = Dimensions.get('window');

const containers = {
  slideshow: Slideshow,
  categories: CategoryList,
  products: ProductList,
  productcategory: ProductCategory,
  banners: Banners,
  text: TextInfo,
  countdown: CountDown,
  blogs: BlogList,
  testimonials: Testimonials,
  button: Button,
  vendors: Vendors,
  search: Search,
  divider: Divider,
  // Locator:Locator
};

const widthComponent = (spacing) => {
  if (!spacing) {
    return width;
  }
  const marginLeft =
    spacing.marginLeft && parseInt(spacing.marginLeft, 10)
      ? parseInt(spacing.marginLeft, 10)
      : 0;
  const marginRight =
    spacing.marginRight && parseInt(spacing.marginRight, 10)
      ? parseInt(spacing.marginRight, 10)
      : 0;
  const paddingLeft =
    spacing.paddingLeft && parseInt(spacing.paddingLeft, 10)
      ? parseInt(spacing.paddingLeft, 10)
      : 0;
  const paddingRight =
    spacing.paddingRight && parseInt(spacing.paddingRight, 10)
      ? parseInt(spacing.paddingRight, 10)
      : 0;
  return width - marginLeft - marginRight - paddingLeft - paddingRight;
};

class HomeScreen extends Component {

  componentDidMount(){
    OneSignal.init('06fcce55-a596-4272-bbbf-7c55d14eb7b6', {
      kOSSettingsKeyAutoPrompt: true,
    });
    OneSignal.getPermissionSubscriptionState( (status) => {
     const  notiuserID = status.userId;
      this.props.dispatch(NotificationUserId(notiuserID))
    });
  }

  OnPress = (data) => {
    const {Locator} = this.props;
    if(Locator.selectedLocation.name == ''){
      alert('Please Select Location')
    }
    else{
      action(data)
    }
  }

 Item = (item,index) => {
  //  console.log('Item ===', item )
        return(
            <TouchableOpacity 
            onPress={()=>this.OnPress(item.item)}
            style={[styles.Item,{height:item.item.height,}]}>
                <Image
                style={{height:item.item.height}}
                source={{uri:item.item.imageBanner}}
                resizeMode='contain'
                />
            </TouchableOpacity>
        )
    }
  renderContainer() {
    // console.log('Config', config)
    // const Container = containers[config.type];
    // if (!Container) {
    //   return null;
    // }
    return (
      <View  >
      {
        this.props.Locator.location_veggie.homelayout == undefined ?
        
         <Image
            source={require('../assets/images/cold-open.png')}
             style={{marginTop: 50, marginRight: 'auto', marginLeft: 'auto'
           }}
         />
        :
        <FlatList 
          data={this.props.Locator.location_veggie.homelayout}
          numColumns={2}
          renderItem={ (item,index)=> this.Item(item,index) }
          />
      }
      </View>
    );
  };



  render() {
    const {config, toggleSidebar, navigation} = this.props;

    return (


      <ThemedView isFullView>
        <Header
          leftComponent={
            toggleSidebar ? (
              <IconHeader
                name="align-left"
                size={22}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            ) : null
          }
          centerComponent={<Logo />}
          rightComponent={<CartIcon />}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
             <Locator/>
          {/* {config.map((data) => this.renderContainer(data))} */}
          {
            this.renderContainer()
          }
        </ScrollView>
        <ModalHomePopup />
      </ThemedView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: dataConfigSelector(state),
    toggleSidebar: toggleSidebarSelector(state),
     Locator: LocationSelector(state),
  };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex:1,
      backgroundColor:'white'
  },
  Item:{
      flex:1,
      backgroundColor:'white'
  },
  text:{
   textAlign:'center', 
   fontSize:16,
   fontWeight:'bold',
   marginTop:80
  }
});