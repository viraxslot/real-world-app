import { APIRequestContext } from '@playwright/test';
import { User } from '../shared/types';
import { TestConfig } from '../config/test-config';

export class ApiHelper {
  static apiUrl = TestConfig.apiUrl;

  static headers = {
    'Content-Type': 'application/json',
  };

  static async registerUser(request: APIRequestContext, user: User) {
    return request.post(this.apiUrl + '/users', {
      data: JSON.stringify({
        user,
      }),
      headers: this.headers,
    });
  }
}
