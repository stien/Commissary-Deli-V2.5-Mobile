import React from 'react';
import {StyleSheet, TouchableOpacity,Text, View, SafeAreaView,FlatList,Image} from 'react-native';
import {Header, ThemedView} from 'src/components';
import {TextHeader, IconHeader, CartIcon} from 'src/containers/HeaderComponent';
import action from 'src/utils/action';


class DeliMeat extends React.Component { 


    SelectMeat=(data)=>{
       const val ={
            "type":'category',
            "id":data.category
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
        return (
            <SafeAreaView style={styles.container}>
                <Header
                leftComponent={<IconHeader/>}
                centerComponent={<TextHeader title={'Deli Meats'}/>}
                rightComponent={<CartIcon/>}
                />

                <FlatList 
                data={Data}
                numColumns={2}
                renderItem={ (item,index)=> this.Item(item,index) }
                />
            </SafeAreaView>
          );
    }
};


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
export default DeliMeat;

const Data =[
    {
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0008_TURKEY.jpg",
    "category": 217
    },
    {
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0007_HAM.jpg",
    "category": 21
    },
    {
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0006_BEEF.jpg",
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "category": 41
    },
    {
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0005_chicken.jpg",
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "category": 95
    },
    {
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0003_salami.jpg",
    "category": 272
    },
    {
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0002_pastrami.jpg",
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "category": 269
    },
    {
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0001_german-meats.jpg",
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "category": 270
    },
    {
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0000_italian-meats.jpg",
    "category": 271
    },
    {
    "column": 2,
    "height": 290,
    "layout": "bannerImage",
    "imageBanner": "https://mdbsapi.daviserve.com/mdbs-content/uploads/2020/02/top-4-banners_0000s_0004_bologna.jpg",
    "category": 43
    }
    ]