import React,{Component} from 'react';

import {connect} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';

import {homeTabs, mainStack, authStack} from 'src/config/navigator';
import {ScrollView, View, Dimensions, Text, Modal, StyleSheet, TouchableHighlight, TextInput} from 'react-native';

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
      //  alert(notiuserID);
      this.props.dispatch(NotificationUserId(notiuserID))
    });
  }


  renderContainer(config) {
    console.log('Config', config)
    const Container = containers[config.type];
    if (!Container) {
      return null;
    }
    return (
      <View key={config.id} style={config.spacing && config.spacing}>
        <Container
          {...config}
          widthComponent={widthComponent(config.spacing)}
        />
      </View>
    );
  };


     state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {config, toggleSidebar, navigation} = this.props;
    const { modalVisible } = this.state;
    const value = '';
    const pass = '3600'

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

             <Locator />
          {config.map((data) => this.renderContainer(data))}
   
        </ScrollView>
        <ModalHomePopup />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
      <TextInput
            style={{ height: 40, width: 60, borderColor: '#f1f1f1', borderWidth: 1, padding: 5, margin: 10 }}
            placeholder="Click Enter to esc"
            secureTextEntry={true}
            ref= {(el) => { this.username = el; }}
            onChangeText={(username) => this.setState({username})}
            clearTextOnFocus={true}
            secureTextEntry={true}
            defaultValue={null}
            value={this.state.username}
          />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                  let username=this.state.username;
                  this.setState({username: ''})

                  if (username == pass){
                   {
                    const { navigation } = this.props;
                    navigation.pop();
                    navigation.navigate(mainStack.account);
                  }
                  setTimeout(function(){ 
                    let username='' ;
                  }, 2000);
                 
                  }
                }}
              >  
                <Text style={styles.textStyle}>close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton2}
          onPress={() => {
            this.setModalVisible(true);
            username='';
                    
          }}
        >
          <Text style={styles.textStyle}>i</Text>
        </TouchableHighlight>
      </ThemedView>

    );
  }

}

const mapStateToProps = (state) => {
  return {
    config: dataConfigSelector(state),
    toggleSidebar: toggleSidebarSelector(state),
  };
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 6,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton2: {
    backgroundColor: "#f1f1f1",
    width: 30,
    height: 15,
    borderRadius: 0,
    padding: 0,
    elevation: 0,
    position: 'absolute', 
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8
  },  
  openButton: {
    backgroundColor: "#000",
    width: 80,
    borderRadius: 0,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default connect(mapStateToProps)(HomeScreen);
