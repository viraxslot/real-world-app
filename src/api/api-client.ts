import { Config } from '../config/config';
import { SignUpRequest } from './types';

export class ApiClient {
  static apiUrl = Config.apiUrl + '/api';

  static defaultHeaders = {
    'Content-Type': 'application/json',
  };

  static async signUp(options: SignUpRequest): Promise<Response> {
    return fetch(this.apiUrl + '/users', {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(options),
    });
  }
}
