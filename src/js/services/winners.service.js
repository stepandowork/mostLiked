import Http from '../core/http.service';
import {ENV} from '../config/env';
export default class WinnersService {
  constructor() {

  }
  
  async getWinners({part, limit}) {
    const http = new Http();
    try {
      let response = await http.get(`${ENV.apiUrl}/public/winners?part=${part}&limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error("error");
    }
  }
}