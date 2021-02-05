import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Icon as IconComponent} from 'src/components';
import {useNavigation} from '@react-navigation/native';

const Icon = ({onPress, ...rest}) => {
  const navigation = useNavigation();
  const handleClick = onPress ? onPress : () => navigation.goBack();

  // return (
  //   <TouchableOpacity onPress={handleClick} style={styles.container, {backgroundColor: '#ffffff73', borderRadius: 8 , flexDirection :'row'}}>
  //     <IconComponent name="chevron-left" size={26} isRotateRTL {...rest} />
  //     <Text style={{textAlign:'left', alignSelf:'center',fontWeight:'500',fontSize:16}}>back</Text>
  //   </TouchableOpacity>
  // );
   return (
    <TouchableOpacity onPress={handleClick} style={styles.container, {backgroundColor: '#ffffff73', borderRadius: 8 , flexDirection :'row', width: 80, paddingTop: 6, height: 40}}>
      <IconComponent name="chevron-left" size={26} isRotateRTL {...rest} />
      <Text style={{textAlign:'left', alignSelf:'center',fontWeight:'500',fontSize:16, paddingBottom: 5}}>back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
});

export default Icon;
