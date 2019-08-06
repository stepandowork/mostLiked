import Http from '../core/http.service';
import {ENV} from '../config/env';

export default class UserService {
  constructor() {

  }

  getUser(id) {
    const http = new Http();
    return new Promise((resolve, reject)=>{      
      http.get(`${ENV.apiUrl}/public/users/get-info/${id}`)
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  getUserImages(id) {
    const http = new Http();
    return new Promise((resolve, reject)=>{      
      http.get(`${ENV.apiUrl}/public/users/my-images/${id}`)
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }
}