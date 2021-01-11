import {put, call, takeEvery, select} from 'redux-saga/effects';
import * as Actions from './constants';

import {getLocation,getLocationVeggies} from './service';

/**
 * Fetch data saga
 * @returns {IterableIterator<*>}
 */
function* fetchLocationSaga() {
  try {
    // const query = {
    //   lang: lang,
    // };
    console.log('Saga')
     const data = yield call(getLocation);
     console.log('data of location', data )
     yield put({type: Actions.GET_LOCATION_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: Actions.GET_LOCATION_ERROR, error: e});
  }
}

function* getLocationVeggiesSaga(payload) {
  try {
    // const query = {
    //   lang: lang,
    // };
    console.log('Saga')
     const data = yield call(getLocationVeggies, payload );
     console.log('data of location', data )
     yield put({type: Actions.GET_VEGGIES_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: Actions.GET_VEGGIES_ERROR, error: e});
  }
}

// function* callLocationSaga(action) {
//     try {
//         const data = yield call(action.payload);
//       console.log('callSetLocation Saga',data)
//        yield put({type: Actions.SET_LOCATION, payload: data});
//     } catch (e) {
//       yield put({type: Actions.SET_LOCATION_ERROR, error: e});
//     }
//   }


function* LocationSaga() {
  yield takeEvery(Actions.GET_LOCATION, fetchLocationSaga);
  yield takeEvery(Actions.GET_VEGGIES, getLocationVeggiesSaga );
}

export default LocationSaga