import * as Actions from './constants';

type Action = {type: string, payload: Object};

/**
 * Action Add to cart
 * @param item
 * @param cb
 * @returns {{type: string, payload: {item: CartItem, cb: *}}}
 */
export function addToCart(item , veggies,condiments,NotiId ,cb = () => {}): Action {
  // console.log('vvvvv', veggies)
  // console.log('ggggg', condiments)
  // console.log('NotiId', NotiId)
   item.cart_item_data={
    veggie:veggies,
    condi:condiments,
    NotiUserId:NotiId
   }
  // console.log('addToCart', {item, cb})
  return {
    type: Actions.ADD_TO_CART,
    payload: {item, cb},
  };
}

/**
 * Action Add list to cart
 * @param data
 * @param cb
 * @returns {{type: string, payload: {data: *, cb: *}}}
 */
export function addListToCart(data, cb = () => {}): Action {
  return {
    type: Actions.ADD_LIST_CART,
    payload: {data, cb},
  };
}

/**
 * Action remove from cart
 * @param item
 * @returns {{type: string, payload: {item: *}}}
 */
export function removeFromCart(item): Action {
  return {
    type: Actions.REMOVE_FROM_CART,
    payload: item,
  };
}

/**
 * Action update quantity cart
 * @param item
 * @returns {{type: string, payload: {item: *, cb: *}}}
 */
export function updateQuantityCart(item): Action {
  return {
    type: Actions.UPDATE_QUANTITY_CART,
    payload: item,
  };
}

/**
 * Get cart rest api
 * @returns {{type: string, payload: *}}
 */
export function getCart() {
  return {
    type: Actions.GET_CART,
    payload: true,
  };
}

export function getCart2() {
  return {
    type: Actions.GET_CART,
  };
}

/**
 * Action clear all item in cart
 * @returns {{type}}
 */
export function clearCart() {
  return {
    type: Actions.CLEAR_CART,
  };
}

/**
 * Add coupon code
 * @param code
 * @returns {{type, payload: {code: *}}}
 */
export function addCoupon(code, cb) {
  return {
    type: Actions.ADD_COUPON,
    payload: {
      code,
      cb,
    },
  };
}

/**
 * Action remove coupon
 * @returns {{type}}
 */
export function removeCoupon(code) {
  return {
    type: Actions.REMOVE_COUPON,
    payload: {
      code,
    },
  };
}
