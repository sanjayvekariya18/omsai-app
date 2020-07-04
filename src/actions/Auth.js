import {HTTP} from '../appConfig/HTTP';
import axios from 'axios';
import config from '../appConfig/config';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from '../constants/actionTypes';

// example action
export function loginRequest(parameter) {
  console.log('------------------ActionParameter-----------', parameter);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      HTTP('post', 'api/login', parameter, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('---------LoginRes-----------------', response);
          if (response.status == 200) {
            dispatch({
              type: LOGIN_SUCCESS,
              subtype: 'success',
              userCredentials: response.data.data,
            });
          }
          resolve(response);
        })
        .catch(error => {
          console.log('------------Login-Error-------', error);
          dispatch({
            type: LOGIN_FAIL,
            error,
          });
          reject(error);
        });
    });
  };
}

// ---------------------------------------- Logout Actions -------------------------------------
export function logout() {
  return function(dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        // persistor.purge()
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        resolve(true);
      } catch (e) {
        rejects(e);
      }
    });
  };
}

export function logout123() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('post', 'api/logout', {}, {Authorization: `Bearer ${token}`})
          .then(response => {
            console.log(
              '--------------Logout-----response-----------------',
              response,
            );
            if (response.status == 200) {
              dispatch({
                type: LOGOUT_SUCCESS,
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
