import React from 'react';

import {compose} from 'recompose';
import {connect} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import unescape from 'lodash/unescape';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {withTheme, Image, Badge, Text} from 'src/components';
import WishListIcon from '../WishListIcon';
import Price from '../Price';
import Rating from '../Rating';

import {configsSelector} from 'src/modules/common/selectors';

import {white, black} from 'src/components/config/colors';
import {borderRadius, margin} from 'src/components/config/spacing';
import {mainStack} from 'src/config/navigator';
import {withAddToCart} from 'src/hoc/hoc-add-to-card';

import {SIMPLE} from 'src/config/product';
import {  LocationSelector } from '../../modules/Locator/selector';
import { fetchLocation, VeggieLoading} from 'src/modules/Locator/action';
const ItemDefault = React.memo((props) => {
  const {
    item,
    width,
    height,
    navigation,
    dispatch,
    navigationType,
    theme,
    configs,
    addCart,
    loading,
    LB,
    Locator,
  } = props;
  const {
    id,
    name,
    images,
    price_format,
    on_sale,
    is_new,
    type,
    average_rating,
    rating_count,
    purchasable,
    stock_status,
    name1,
  } = item;
  const {t} = useTranslation();

  const productItemStyle = {
    width: width,
  };

  const productItemImageStyle = {
    width,
    height,
  };
  const listStatus = ['instock', 'onbackorder'];
  
  const HandlePartyTray = (id) => {

  const NotiId = Locator.NotiUserId;

    if(LB == 'Party Trays' || item.categories[0].name == 'Party Trays'){
      alert('Please Note: A minimum 1 hour will be needed to prepare this item.')
      addCart(id, null, null, NotiId);
    }
    else{

      addCart(id, null, null, NotiId );
    }
  }

 if (LB == 'breakfast paninis' || item.categories[0].name == 'breakfast paninis' || LB == 'panini sandwiches' || item.categories[0].name == 'panini sandwiches'){

  return (
    <TouchableOpacity
      style={productItemStyle}
      onPress={() =>{
        props.dispatch( VeggieLoading(true) )
        navigation[navigationType](mainStack.product, {product: item})
      }

      }>
      <View>
        <Image
          source={
            images && images.length
              ? {uri: images[0].src, cache: 'reload'}
              : require('src/assets/images/pDefault.png')
          }
          style={productItemImageStyle}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.labelWrap}>
          <View style={styles.viewHeaderLabel}>
            <View>
              {is_new ? (
                <Badge
                  value={t('common:text_new')}
                  status="success"
                  containerStyle={styles.badge}
                />
              ) : null}
              {on_sale ? (
                <Badge value={t('common:text_sale')} status="warning" />
              ) : null}
            </View>

          </View>
        </View>
      </View>
      <View style={styles.viewInfo}>
        <Text
          h6
          style={[
            styles.textName,
            {
              color: theme.ProductItem.color,
            },
          ]}>
          {unescape(name)}
        </Text>
        <Price
          price_format={price_format}
          name1={LB}
          type={type}
          style={styles.textPrice}
        />

        {/* <Text>{"(per lb)"}</Text> */}


        {configs.get('toggleReviewProduct') &&
        configs.get('toggleRatingProduct') ? (
          <View style={styles.viewFooter}>
            <Rating
              size={12}
              startingValue={parseFloat(average_rating)}
              readonly
            />
            <Text style={styles.nameRating}>({rating_count})</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );


} else {

    return (
    <TouchableOpacity
      style={productItemStyle}
      onPress={() => {
        props.dispatch( VeggieLoading(true) )
        navigation[navigationType](mainStack.product, {product: item})
      }
      }>
      <View>
        <Image
          source={
            images && images.length
              ? {uri: images[0].src, cache: 'reload'}
              : require('src/assets/images/pDefault.png')
          }
          style={productItemImageStyle}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.labelWrap}>
          <View style={styles.viewHeaderLabel}>
            <View>
              {is_new ? (
                <Badge
                  value={t('common:text_new')}
                  status="success"
                  containerStyle={styles.badge}
                />
              ) : null}
              {on_sale ? (
                <Badge value={t('common:text_sale')} status="warning" />
              ) : null}
            </View>

          </View>
          {configs.get('toggleAddButtonProduct') &&
            configs.get('toggleCheckout') &&
            type === SIMPLE &&
            purchasable &&
            listStatus.includes(stock_status) && 
            (
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => HandlePartyTray(id)}>
                {
                  loading ? <ActivityIndicator size="small"/> : <Text h4 medium style={styles.textAdd}>
                  +
                </Text>}
              </TouchableOpacity>

            )
}

        </View>
      </View>
      <View style={styles.viewInfo}>
        <Text
          h6
          style={[
            styles.textName,
            {
              color: theme.ProductItem.color,
            },
          ]}>
          {unescape(name)}
        </Text>
        <Price
          price_format={price_format}
          name1={LB}
          type={type}
          style={styles.textPrice}
        />

        {/* <Text>{"(per lb)"}</Text> */}

        
        {configs.get('toggleReviewProduct') &&
        configs.get('toggleRatingProduct') ? (
          <View style={styles.viewFooter}>
            <Rating
              size={12}
              startingValue={parseFloat(average_rating)}
              readonly
            />
            <Text style={styles.nameRating}>({rating_count})</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

}
});

const styles = StyleSheet.create({
  viewInfo: {
    marginTop: margin.base + 2,
  },
  labelWrap: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  viewHeaderLabel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textName: {
    marginBottom: 4,
  },
  textPrice: {
    marginBottom: margin.small,
  },
  badge: {
    marginBottom: 5,
  },
  viewFooter: {
    flexDirection: 'row',
    // justifyContent: '',
    alignItems: 'center',
  },
  nameRating: {
    fontSize: 10,
    lineHeight: 15,
    marginLeft: margin.small - 2,
  },
  buttonAdd: {
    backgroundColor: black,
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.base,
  },
  textAdd: {
    color: white,
  },
});

ItemDefault.defaultProps = {
  width: 227,
  height: 227,
  navigationType: 'navigate',
};

const mapStateToProps = (state) => {
  return {
    configs: configsSelector(state),
    Locator:LocationSelector(state),
  };
};

const ItemDefaultComponent = compose(
  withTheme,
  connect(mapStateToProps),
  withAddToCart,
)(ItemDefault);

export default function (props) {
  const navigation = useNavigation();
  return <ItemDefaultComponent navigation={navigation} {...props} />;
};
