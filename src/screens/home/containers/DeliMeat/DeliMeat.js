import React from 'react';
import {StyleSheet, TouchableOpacity,Text, View, SafeAreaView,FlatList,Image} from 'react-native';
import { connect } from 'react-redux';
import {Header, ThemedView} from 'src/components';
import { LocationSelector, setLocationSelector } from '../../../../modules/Locator/selector';
import {TextHeader, IconHeader, CartIcon} from 'src/containers/HeaderComponent';
import action from 'src/utils/action';


class DeliMeat extends React.Component { 

    SelectMeat=(data)=>{
    console.log('DATA in delimeat ::', data)
       const val ={
            "type":data.type,
            "id":data.id
        }
        action(val)
    }

    Item = (item,index) => {
        return(
            <TouchableOpacity 
            onPress={()=>this.SelectMeat(item.item)}
            style={[styles.Item,{height:item.item.height,}]}>
                <Image
                style={{height:item.item.height}}
                source={{uri:item.item.imageBanner}}
                resizeMode='contain'
                />
            </TouchableOpacity>
        )
    }

    render(){
        const { Locator } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <Header
                leftComponent={<IconHeader/>}
                centerComponent={<TextHeader title={'Deli Meats'}/>}
                rightComponent={<CartIcon/>}
                />

                <FlatList 
                data={Locator.location_veggie.meatslayout}
                numColumns={2}
                renderItem={ (item,index)=> this.Item(item,index) }
                />
            </SafeAreaView>
          );
    }
};

const mapStateToProps = (state) => ({
    Locator: LocationSelector(state),
    
});
// export default DeliMeat;
export default connect(mapStateToProps)(DeliMeat);

const styles = StyleSheet.create({
  container: {
    flex:1,
      backgroundColor:'white'
  },
  Item:{
      flex:1,
      backgroundColor:'white'
  }
});