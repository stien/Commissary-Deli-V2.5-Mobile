import request from 'src/utils/fetch';
import queryString from 'query-string';
import {PLUGIN_NAME} from 'src/config/development';


/**
 * Fetch category data
 * @returns {*}
 */
export const getLocation = () =>{
    // console.log('Service call')
    return new Promise((resolve, reject) => {
        let baseURL = 'https://mdbsapi.daviserve.com/locations';
        fetch(baseURL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.code) {
              reject(new Error(data.message));
            } else {
              resolve(data.locations);
              console.log('dataaaa in location',data)
            }
          })
          .catch((error) => {
            return error;
          });
      });
}

export const getLocationVeggies = (val) =>{
    console.log('val in get veggies', val.payload )
    return new Promise((resolve, reject) => {
      // https://mdbsapi.daviserve.com/locations/davis-monthan/
        let baseURL = `https://mdbsapi.daviserve.com/locations/${val.payload}`;
        fetch(baseURL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // if (data.code) {
            //   reject(new Error(data.message));
            // } else {
              resolve(data);
              console.log('dataaaa in location veggie',data)
            // }
          })
          .catch((error) => {
            return error;
          });
      });
}

