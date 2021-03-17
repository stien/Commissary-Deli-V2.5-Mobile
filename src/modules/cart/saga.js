import {put, call, takeEvery, select, delay} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import * as Actions from './constants';
import {
  addToCart,
  removeCartItem,
  updateCartQuantity,
  getCart,
  addCoupon,
  removeCoupon,
} from './service';
// import { addToCart } from './actions'
import {cartKeySelector} from './selectors';
/**
 * Add to cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* addToCartSaga({payload}) {
  const {item, cb} = payload;
  try {
    const cartKey = yield select(cartKeySelector);
    const data = yield call(addToCart, item, cartKey);
    console.log('addTocart ============ ',data.cart_key)
    yield call(cb, {success: true});
    yield put({
      type: Actions.ADD_TO_CART_SUCCESS,
      payload: data.cart_key,
    });
    yield put({
      type: Actions.GET_CART,
      payload: true,
    });
  } catch (error) {
    console.log('Error',error)
    if (cb) {
      yield call(cb, {success: false, error});
    }
  }
}

/**
 * Add list to cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* addListToCartSaga({payload}) {
  const {data, cb} = payload;
  try {
    yield put({
      type: Actions.ADD_LIST_CART_SUCCESS
    });
  } catch (error) {
    yield put({
      type: Actions.ADD_LIST_CART_ERROR
    });
  }
}

/**
 * Remove from cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* removeFromCartSaga({payload}) {
  try {
    const cartKey = yield select(cartKeySelector);
    yield call(removeCartItem, payload, cartKey);
    yield call(showMessage, {
      message: 'Item Removed From Cart',
      type: 'success',
    });
    // yield put({
    //   type: Actions.GET_CART,
    // });
  } catch (error) {
    yield put({
      type: Actions.REMOVE_FROM_CART_ERROR
    });
       yield put({
      type: Actions.GET_CART,
    });
    yield call(showMessage, {
      message: error.message,
      type: 'danger',
    });
  }
}

/**
 * Update quantity cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* updateQuantityCartSaga({payload}) {
  
  try {
    const cartKey = yield select(cartKeySelector);
    yield call(updateCartQuantity, payload, cartKey);
    yield call(showMessage, {
      message: 'Quantity Updated',
      type: 'success',
    });
    // yield put({
    //   type: Actions.ADD_TO_CART_SUCCESS,
    //   payload: payload.cart_item_key,
    // });
    // yield delay(1000)
    // yield put({type: Actions.GET_CART});
    // yield call(addToCart, item,11);
    // yield put({type: Actions.GET_CART});
    // yield call( addToCart , null ,null )
    // yield call(addToCart, 'Hello', '11');
    // yield delay(1000)
  } catch (error) {
    yield put({
      type: Actions.UPDATE_QUANTITY_CART_ERROR,
    });
    yield put({type: Actions.GET_CART});
    yield call(showMessage, {
      message: error.message,
      type: 'danger',
    });
  }
}

/**
 * Get list cart sage REST API
 * @returns {IterableIterator<*>}
 */
function* getCartSaga() {
  try {
    const cartKey = yield select(cartKeySelector);
    if (cartKey) {
      const query = {
        cart_key: cartKey,
      };
      const data = yield call(getCart, query);
      console.log(' getCartSaga  ====== ', data)
      yield put({type: Actions.GET_CART_SUCCESS, payload: data});
    } else {
      yield put({type: Actions.GET_CART_ERROR});
    }
  } catch (e) {
    yield put({type: Actions.GET_CART_ERROR});
  }
}

function* addCouponSaga({payload}) {
  try {
    const {code, cb} = payload;
    const cartKey = yield select(cartKeySelector);
    const data = yield call(addCoupon, {coupon_code: code}, cartKey);
    if (data.success) {
      yield put({
        type: Actions.GET_CART,
      });
      yield call(cb);
    } else {
      yield call(showMessage, {
        message: 'Please check code again',
        type: 'danger',
      });
      yield put({
        type: Actions.ADD_COUPON_ERROR,
      });
    }

  } catch (e) {
    yield put({
      type: Actions.ADD_COUPON_ERROR,
    });
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}

function* removeCouponSaga({payload}) {
  try {
    const cartKey = yield select(cartKeySelector);
    const data = yield call(removeCoupon, {coupon_code: payload.code}, cartKey);
    if (data.success) {
      yield put({
        type: Actions.GET_CART,
      });
    } else {
      yield call(showMessage, {
        message: 'Please check code again',
        type: 'danger',
      });
      yield put({
        type: Actions.REMOVE_COUPON_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: Actions.REMOVE_COUPON_ERROR,
    });
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(Actions.ADD_TO_CART, addToCartSaga);
  yield takeEvery(Actions.ADD_LIST_CART, addListToCartSaga);
  yield takeEvery(Actions.REMOVE_FROM_CART, removeFromCartSaga);
  yield takeEvery(Actions.UPDATE_QUANTITY_CART, updateQuantityCartSaga);
  yield takeEvery(Actions.GET_CART, getCartSaga);
  yield takeEvery(Actions.ADD_COUPON, addCouponSaga);
  yield takeEvery(Actions.REMOVE_COUPON, removeCouponSaga);
}

      // return state.set(['cart_data','items',[payload.cart_item_key] ], payload.item);