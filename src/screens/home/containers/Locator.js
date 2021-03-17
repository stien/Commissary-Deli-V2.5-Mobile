import React, { useState, Component } from 'react';
import { Picker,  Alert, TouchableOpacity, View,  ActivityIndicator ,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchLocation, setLocation , GetVeggies} from '../../../modules/Locator/action';
import { LocationSelector, setLocationSelector } from '../../../modules/Locator/selector';
import { ScrollView } from 'react-native-gesture-handler';
import { clearCart } from '../../../modules/cart/actions';
import { cartSelector } from '../../../modules/cart/selectors';
import {Text, ListItem, Modal} from '../../../components';
import Button from '../../../containers/Button';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import { isLoginSelector, authSelector } from '../../../modules/auth/selectors';

import {
  templatesSelector,
  activeTemplateSelector,
} from '../../../modules/common/selectors';
import {changeTemplate} from '../../../modules/common/actions';

import {margin, padding} from '../../../components/config/spacing';

class Locator extends Component {
    
    constructor(props, context) {
    super(props, context);
    this.state = {
      selectedid: '',
      selectedName: '',
      visible: false,
      active: '',
    };
  }

   handleSelect = (val) => {
    const {dispatch} = this.props;
    dispatch(changeTemplate(val));
    this.setState({
      visible: false,
    });
  };

    changeLocation = (x) => {
        const {templates, active: activeState, t} = this.props;
        //  console.log('templates', templates.toJS())
         var selectedTemplate = '';
        // const temp = templates.filter(val => val.get('name') == x.name )
       const temp = templates.filter( val=> { 
            if(val.get('name') == x.name){
                selectedTemplate = val
            }
         })
        
        var cart= this.props.data 
        if(Object.keys(cart).length<1){
            this.handleSelect(selectedTemplate)
            this.OkChange(x)
            
        }else{
            this.setState({active: x})
            Alert.alert(
                "Warning",
                "Empty your cart and change locations?",
                [
                    {
                        text: "Stay",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => {
                        this.OkChange(x)
                        this.handleSelect(selectedTemplate)
                    }}
                ],
                { cancelable: false }
            );
        }
    }

    OkChange = (x) => {
      console.log('x ===', x);
        this.props.dispatch(setLocation(x))
        // this.props.dispatch(GetVeggies(x.slug))
        this.props.dispatch(clearCart())
        this.setState({
            visible:false
        })
    }

    render() {
         const { Locator ,isLogin} = this.props;
        const {templates, active: activeState, t} = this.props;
        const {visible, active} = this.state;
        const Loc = Locator.Location;   
        return (
            <>
                <View >
                    <TouchableOpacity
                        disabled={isLogin}
                        style={{ height: 40, paddingVertical: 2, paddingHorizontal: 20, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: "center", marginVertical: 10 }}
                        onPress={() => {
                            this.props.dispatch(fetchLocation());
                            this.setState({
                                visible: true
                            })
                        }}>
                        <Text style={{ color: 'lightgrey', fontSize: 12 }}>Location </Text>
                        <Text style={{ color: '#657280', fontWeight: 'bold' }}>{Locator.selectedLocation.name == '' ? 'Please select Location' : Locator.selectedLocation.name} &#9660;</Text>
                    </TouchableOpacity>
                </View>

             
        <Modal
          visible={visible}
          setModalVisible={() =>
            this.setState({visible: false, active: activeState})
          }
          >
          <ScrollView>
            <View style={styles.viewList}>
              {Loc.map((template) => (
                <ListItem
                  key={template.id}
                  type="underline"
                  small
                  title={template.name}
                  rightIcon={
                    template == active && {
                      name: 'check',
                      type: 'feather',
                    }
                  }
                   onPress={()=>  this.changeLocation(template)}
                />
              ))}
            </View>
          </ScrollView>
        </Modal>
            </>
        )
    }
}





const mapStateToProps = (state) => ({
    Locator: LocationSelector(state),
    selectedLocation: setLocationSelector(state),
    data: cartSelector(state).toJS(),
    templates: templatesSelector(state),
    active: activeTemplateSelector(state),
    isLogin:isLoginSelector(state) 
});

// export default connect(mapStateToProps)(Locator);
export default compose(withTranslation(), connect(mapStateToProps))(Locator);

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff94',
    },
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.125,
        shadowRadius: 3.84,
        elevation: 5
    },
      right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 27,
    height: 14,
    marginRight: margin.small,
  },
  titleRight: {
    lineHeight: 17,
  },
  viewList: {
    paddingHorizontal: padding.big,
  },
  button: {
    paddingHorizontal: padding.big + 4,
  },
});
