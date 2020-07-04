import axios from 'axios';
import config from './config';
import {concat} from 'react-native-reanimated';

export function HTTP(
  method,
  uri,
  data,
  headers = null,
  params = null,
  fullUrl,
) {
  return new Promise((resolve, reject) => {
    let url;
    if (!uri && fullUrl) {
      url = fullUrl;
    } else {
      url = `${config.API_URL}${uri}`.trim();
    }
    const query = {
      method,
      url,
    };

    if (headers != null) {
      query.headers = headers;
    }

    if (params != null) {
      query.params = params;
    }

    if (method === 'post' || method === 'put' || method === 'delete') {
      query.data = data;
    }
    console.log('----------------query---------', query);
    axios(query)
      .then(response => {
        console.log('-----------API--Response--------------', response);
        if (response.status && response.status == 502) {
          response.data = {error: '502', message: 'Server not responding'};
        }
        resolve(response);
      })
      .catch(APIerror => {
        console.log('-----------API--Error--------------', APIerror);
        if (APIerror.status && APIerror.status == 502) {
          APIerror.data = {error: '502', message: 'Server not responding'};
        }
        resolve(APIerror);
      });
  });
}
