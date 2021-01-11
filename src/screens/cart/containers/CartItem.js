import React, { useState } from 'react';
import split from 'lodash/split';
import unescape from 'lodash/unescape';

import { StyleSheet, View, Text } from 'react-native';
import { Image, ThemeConsumer } from 'src/components';
import { Row, Col } from 'src/containers/Gird';
import Quantity from 'src/containers/Quantity';

import { grey4 } from 'src/components/config/colors';
import { lineHeights, sizes } from 'src/components/config/fonts';
import { margin, padding } from 'src/components/config/spacing';

import currencyFormatter from 'src/utils/currency-formatter';
import { object } from 'prop-types';

const getUrlImage = thumb => {
  if (!thumb || typeof thumb !== 'string') {
    return null;
  }
  const array = split(thumb, 'src="');
  return split(array ?.[1] ?? '', '"')[0];
};


function CartItem(props) {

  const [Val, setVal] = useState(-1)
  const { item, currency, updateQuantity, goToProduct, style } = props;
  console.log('Item in variation', item)
  if (!item) {
    return null;
  }
  const {
    key,
    product_id,
    thumb,
    thumbnail,
    name,
    quantity,
    line_subtotal,
  } = item;
  const image = thumb || getUrlImage(thumbnail);


  const HideTotal = (line_subtotal, quantity, currency, item) => {
    console.log('item variation length', item.variation.length)
    if (item.variation.length == 0) {
      return currencyFormatter(line_subtotal / quantity, currency)
    } else {

      Object.values(item.variation).map((data, index) => {
        if (data.search('lb') > -1) {
          setVal(1)
        }
      })
      if (Val > -1) {
        return null
      } else {
        return currencyFormatter(line_subtotal / quantity, currency)
      }
    }

  }


  return (
    <ThemeConsumer>
      {({ theme }) => (
        <Row
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.bgColor,
              borderColor: theme.colors.border,
            }, {
              flex: 1
            },
            style && style,
          ]}>
          <Image
            source={image ? { uri: image } : require('src/assets/images/pDefault.png')}
            style={styles.image}
          />
          <Col style={styles.content}>


            <View>
              <Text
                medium
                onPress={() => goToProduct(product_id)}
                style={styles.title}>
                {unescape(name).split('-')[0]}
              </Text>

              {Object.values(item.variation).map((data, index) =>

                <Text style={{ color: 'black', fontSize: 11 }}>
                    {/*{ data.indexOf('lb')<0 ? data.replace(/-/g,' ').replace('2 00','$2').replace('6','6"').replace('12','12"') : null }*/}
                    { data.replace(/-/g,' ').replace('2 00','$2').replace('6','6"').replace('12','12"').replace('_','/') }
                </Text>

              )}


              {item.veggie == null || item.veggie == undefined ?
                null
                :
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Veggies</Text>
                  {Object.values(item.veggie).map((data, index) =>
                    <Text style={{ color: 'black', fontSize: 11 }}>
                      {data.title}
                    </Text>
                  )}
                </View>
              }

              {item.condi == null || item.condi == undefined ?
                null
                :
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Condiments</Text>
                  {Object.values(item.condi).map((data, index) =>
                    <Text style={{ color: 'black', fontSize: 11 }}>
                      {data.title}
                    </Text>
                  )}
                </View>
              }
            </View>
            <Quantity style={{ marginTop: 11 }} value={quantity} onChange={(value) => updateQuantity(key, value,item )} />
          </Col>
          <Text medium>{HideTotal(line_subtotal, quantity, currency, item)}</Text>
        </Row>
      )}
    </ThemeConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginRight: 0,
    padding: padding.large,
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 107,
  },
  content: {
    paddingLeft: padding.big,
    paddingRight: padding.big,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: margin.small - 1,
    fontWeight: 'bold',
  },
  viewAttribute: {
    marginBottom: margin.small,
    marginLeft: 0,
    marginRight: 0,
    flexWrap: 'wrap',
  },
  textAttribute: {
    fontSize: sizes.h6 - 2,
    lineHeight: lineHeights.h6 - 2,
    color: grey4,
    marginRight: margin.small,
  },
});

export default CartItem;