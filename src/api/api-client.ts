import { Config } from '../config/config';
import { AuthHeader, SignInRequest, SignUpRequest } from './types';

export class ApiClient {
  static apiUrl = Config.apiUrl;
  static getAuthHeader = (token: string) => {
    return {
      Authorization: `Token ${token}`,
    };
  };

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

  static async signIn(options: SignInRequest): Promise<Response> {
    return fetch(this.apiUrl + '/users/login', {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(options),
    });
  }

  static async userProfile(authHeader: AuthHeader): Promise<Response> {
    const auth = this.getAuthHeader(authHeader.token);

    return fetch(this.apiUrl + '/user', {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...auth },
    });
  }
}
