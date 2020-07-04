import {HTTP} from '../appConfig/HTTP';
import axios from 'axios';
import config from '../appConfig/config';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

// ----------------------------# GET ALL Types API-CALL #------------------------
export function GetTypes() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('get', 'api/types', {}, {Authorization: `Bearer ${token}`})
          .then(response => {
            console.log('--------------response-----------------', response);
            if (response.status == 200) {
              dispatch({
                type: 'GET_TYPES_LIST',
                subtype: 'success',
                TypesList: response.data.data.reverse(),
              });
            }
            resolve(response);
          })
          .catch(error => {
            console.log('--------------Error-----------------', error);
            reject(error);
          });
      });
    });
  };
}

// ----------------------------# ADD - TYPES - API-CALL #------------------------
export function TypesAdd(payload) {
  console.log('------Add-Types-PAYLOAD--------', payload);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('post', 'api/types', payload, {
          Authorization: `Bearer ${token}`,
        })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
}
// ----------------------------# EDIT - TYPE - API-CALL #------------------------
export function TypesEdit(id, payload) {
  console.log('------StatusEdit-PAYLOAD--------', payload);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('put', `api/types/${id}`, payload, {
          Authorization: `Bearer ${token}`,
        })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
}
// ----------------------------# DELETE - TYPES - API-CALL #------------------------
export function TypeDelete(id) {
  console.log('--------Status-ID--------', id);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP(
          'delete',
          `api/types/${id}`,
          {},
          {
            Authorization: `Bearer ${token}`,
          },
        )
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
}
