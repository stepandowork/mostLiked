import Http from './../core/http.service';
import {ENV} from './../config/env';

export default class AuthService {
  constructor() {

  }

  get userId() {    
    return localStorage.getItem("most_liked_user_id");
  }

  get userToken() {
    return localStorage.getItem("most_liked_user_token");
  }

  async login(email, password) {
    try {
      const http = new Http();
      let response = await http.post(`${ENV.apiUrl}/public/auth/login`, {email, password});
      if (!response.auth) {
        return new Error(response);
      };
      localStorage.setItem("most_liked_user_id", response.id);
      localStorage.setItem("most_liked_user_token", response.token);
      return response;
    } catch(error) {
      console.log(error);
    }    
  }

  register(userData) {
    const http = new Http();
    return new Promise((resolve, reject)=>{
      http.post(`${ENV.apiUrl}/public/auth/signup`, userData)
      .then((response) => {
        if (!response.auth) {
          return reject(response)
        };        
        resolve(response);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  logout() {
    return new Promise( (resolve, reject) => {
      localStorage.removeItem("most_liked_user_id");
      localStorage.removeItem("most_liked_user_token");
      resolve();
    });
  }
}