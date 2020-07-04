import {HTTP} from '../appConfig/HTTP';
import axios from 'axios';
import config from '../appConfig/config';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

// ----------------------------# GET ALL STATUS API-CALL #------------------------
export function GetStatuses() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('get', 'api/statuses', {}, {Authorization: `Bearer ${token}`})
          .then(response => {
            console.log('--------------response-----------------', response);

            if (response.status == 200) {
              dispatch({
                type: 'GET_STATUS_LIST',
                subtype: 'success',
                StatusList: response.data.data.reverse(),
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
// ----------------------------# STATUS DETAILS API-CALL #------------------------
export function GetEmployeeDetails(id) {
  console.log('Employee-Id--------', id);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP(
          'get',
          `api/employees/${id}`,
          {},
          {Authorization: `Bearer ${token}`},
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
// ----------------------------# ADD - EMPLOYEES - API-CALL #------------------------
export function StatusAdd(payload) {
  console.log('------ADDEmployee-PAYLOAD--------', payload);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('post', 'api/statuses', payload, {
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
// ----------------------------# EDIT - STATUS - API-CALL #------------------------
export function StatusEdit(id, payload) {
  console.log('------StatusEdit-PAYLOAD--------', payload);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('put', `api/statuses/${id}`, payload, {
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
// ----------------------------# DELETE - STATUS - API-CALL #------------------------
export function StatusDelete(id) {
  console.log('--------Status-ID--------', id);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP(
          'delete',
          `api/statuses/${id}`,
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
