import { Config } from '../config/config';
import { ClientErrors } from '../shared/client-errors';
import {
  AuthHeader,
  SignInRequest,
  SignUpResponseBody,
  SignUpRequest,
  SignInResponseBody,
  UserProfileResponseBody,
  ErrorResponse,
} from './types';

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

  private static checkServerStatus(status: number) {
    if (status === 403) {
      throw new Error(ClientErrors.accessForbidden);
    }
    if ([500, 502, 504].includes(status)) {
      throw new Error(ClientErrors.unexpectedServerError);
    }
  }

  private static async getJsonBody(response: Response) {
    let body;
    try {
      body = await response.json();
    } catch (err) {
      throw new Error(ClientErrors.unableToParseResponseBody);
    }
    return body;
  }

  private static checkBodyErrors(body: ErrorResponse, defaultMessage: string) {
    if (body?.errors) {
      if (Array.isArray(body?.errors) && body?.errors.length > 0) {
        throw new Error(body?.errors.join('\n'));
      }

      if (!Array.isArray(body?.errors) && body?.errors?.body) {
        throw new Error(body?.errors.body.join('\n'));
      }
    } else {
      throw new Error(defaultMessage);
    }
  }

  static async signUp(options: SignUpRequest): Promise<SignUpResponseBody | never> {
    const response = await fetch(this.apiUrl + '/users', {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(options),
    });

    this.checkServerStatus(response.status);
    const body = await this.getJsonBody(response);
    if (!response.ok) {
      this.checkBodyErrors(body, ClientErrors.unableToRegister);
    }
    return body;
  }

  static async signIn(options: SignInRequest): Promise<SignInResponseBody> {
    const response = await fetch(this.apiUrl + '/users/login', {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(options),
    });

    this.checkServerStatus(response.status);
    const body = await this.getJsonBody(response);
    if (!response.ok) {
      this.checkBodyErrors(body, ClientErrors.unableToLogin);
    }
    return body;
  }

  static async userProfile(authHeader: AuthHeader): Promise<UserProfileResponseBody | never> {
    const auth = this.getAuthHeader(authHeader.token);

    const response = await fetch(this.apiUrl + '/user', {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...auth },
    });

    this.checkServerStatus(response.status);
    const body = await this.getJsonBody(response);
    if (!response.ok) {
      this.checkBodyErrors(body, ClientErrors.unableToGetUserProfile);
    }
    return body;
  }
}
