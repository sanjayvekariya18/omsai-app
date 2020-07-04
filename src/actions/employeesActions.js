import {HTTP} from '../appConfig/HTTP';
import axios from 'axios';
import config from '../appConfig/config';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

// ----------------------------# GET ALL EMPLOYEES API-CALL #------------------------
export function GetEmployees() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP(
          'get',
          'api/employees',
          {},
          {Authorization: `Bearer ${token}`, Accept: 'application/json'},
        )
          .then(response => {
            console.log('--------------response-----------------', response);

            if (response.status == 200) {
              dispatch({
                type: 'GET_EMPLOYEES_LIST',
                subtype: 'success',
                EmployeesList: response.data.data.reverse(),
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
// ----------------------------# EMPLOYEES DETAILS API-CALL #------------------------
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
export function EmployeeAdd(payload) {
  console.log('------ADDEmployee-PAYLOAD--------', payload);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('post', 'api/employees', payload, {
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
// ----------------------------# EDIT - EMPLOYEES - API-CALL #------------------------
export function EmployeeEdit(empId, EmpPayload) {
  console.log('Employee-PAYLOAD--------', EmpPayload);
  console.log('Employee-ID--------', empId);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('put', `api/employees/${empId}`, EmpPayload, {
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
// ----------------------------# DELETE - EMPLOYEES - API-CALL #------------------------
export function EmployeeDelete(id) {
  console.log('--------Employee-ID--------', id);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP(
          'delete',
          `api/employees/${id}`,
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
