import {HTTP} from '../appConfig/HTTP';
import axios from 'axios';
import config from '../appConfig/config';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

// ----------------------------# GET ALL JOBS API-CALL #------------------------
export function GetJobs() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('get', 'api/jobs', {}, {Authorization: `Bearer ${token}`})
          .then(response => {
            if (response.status == 200) {
              dispatch({
                type: 'GET_JOBS_LIST',
                subtype: 'success',
                JobsList: response.data.data.reverse(),
              });
            }
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
}
export function GetEmployeeJobs(id) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP(
          'get',
          `api/jobs?user_id=${id}`,
          {},
          {Authorization: `Bearer ${token}`},
        )
          .then(response => {
            if (response.status == 200) {
              dispatch({
                type: 'GET_EMP_JOBS_LIST',
                subtype: 'success',
                EmpJobsList: response.data.data.reverse(),
              });
            }
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  };
}
// ----------------------------# Jobs DETAILS API-CALL #------------------------
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
// ----------------------------# ADD - JOBS - API-CALL #------------------------
export function JobAdd(payload) {
  console.log('------ADD-JOB-PAYLOAD--------', payload);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('post', 'api/jobs', payload, {
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
// ----------------------------# EDIT - JOB - API-CALL #------------------------
export function JobEdit(id, payload) {
  console.log('Job-payload--------', payload);
  console.log('Job-ID--------', id);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP('put', `api/jobs/${id}`, payload, {
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
// ----------------------------# DELETE - JOB - API-CALL #------------------------
export function JobDelete(id) {
  console.log('--------Employee-ID--------', id);
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token').then(token => {
        HTTP(
          'delete',
          `api/jobs/${id}`,
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
