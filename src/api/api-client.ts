import { Config } from '../config/config';
import { ClientErrors } from '../shared/client-errors';
import {
  SignInRequest,
  SignUpResponseBody,
  SignUpRequest,
  SignInResponseBody,
  UserProfileResponseBody,
  ErrorResponse,
  ValidationError,
  TagsResponseBody,
  ArticlesRequestParams,
  ArticleResponseBody,
  ArticlesFeedRequestParams,
} from './types';

export class ApiClient {
  static apiUrl = Config.apiUrl;
  static getAuthHeaders = (token: string) => {
    return {
      ...ApiClient.defaultHeaders,
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
      console.error(err);
      throw new Error(ClientErrors.unableToParseResponseBody);
    }
    return body;
  }

  private static checkBodyErrors(body: ErrorResponse, defaultMessage: string) {
    if (body?.errors) {
      if (Array.isArray(body?.errors) && body?.errors.length > 0) {
        throw new ValidationError(body.errors);
      }

      if (!Array.isArray(body?.errors) && body?.errors?.body) {
        throw new ValidationError(body.errors.body);
      }
    } else {
      throw new Error(defaultMessage);
    }
  }

  // TODO: ideas how to add type safety here?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getURLParams(options: any): string {
    if (typeof options !== 'object' || Array.isArray(options)) {
      return '';
    }

    const params = new URLSearchParams('');
    for (const key of Object.keys(options)) {
      if (options[key] != null) {
        params.set(key, options[key].toString());
      }
    }

    return params.toString();
  }

  static async signUp(options: SignUpRequest): Promise<SignUpResponseBody | never> {
    const response = await fetch(ApiClient.apiUrl + '/users', {
      method: 'POST',
      headers: ApiClient.defaultHeaders,
      body: JSON.stringify(options),
    });

    ApiClient.checkServerStatus(response.status);
    const body = await ApiClient.getJsonBody(response);
    if (!response.ok) {
      ApiClient.checkBodyErrors(body, ClientErrors.unableToRegister);
    }
    return body;
  }

  static async signIn(options: SignInRequest): Promise<SignInResponseBody> {
    const response = await fetch(ApiClient.apiUrl + '/users/login', {
      method: 'POST',
      headers: ApiClient.defaultHeaders,
      body: JSON.stringify(options),
    });

    ApiClient.checkServerStatus(response.status);
    const body = await ApiClient.getJsonBody(response);
    if (!response.ok) {
      ApiClient.checkBodyErrors(body, ClientErrors.unableToLogin);
    }
    return body;
  }

  static async userProfile(token: string): Promise<UserProfileResponseBody | never> {
    const response = await fetch(ApiClient.apiUrl + '/user', {
      method: 'GET',
      headers: ApiClient.getAuthHeaders(token),
    });

    ApiClient.checkServerStatus(response.status);
    const body = await ApiClient.getJsonBody(response);
    if (!response.ok) {
      ApiClient.checkBodyErrors(body, ClientErrors.unableToGetUserProfile);
    }
    return body;
  }

  static async tags(): Promise<TagsResponseBody> {
    const response = await fetch(ApiClient.apiUrl + '/tags', {
      method: 'GET',
      headers: ApiClient.defaultHeaders,
    });

    ApiClient.checkServerStatus(response.status);
    const body = await ApiClient.getJsonBody(response);
    if (!response.ok) {
      ApiClient.checkBodyErrors(body, ClientErrors.unableToGetTags);
    }
    return body;
  }

  static async articles(
    options?: ArticlesRequestParams,
    token?: string,
  ): Promise<ArticleResponseBody> {
    const params = ApiClient.getURLParams(options);
    const url = `/articles?${params}`;

    const response = await fetch(ApiClient.apiUrl + url, {
      method: 'GET',
      headers: ApiClient.getAuthHeaders(token ?? ''),
    });

    ApiClient.checkServerStatus(response.status);
    const body = await ApiClient.getJsonBody(response);
    if (!response.ok) {
      ApiClient.checkBodyErrors(body, ClientErrors.unableToGetArticles);
    }
    return body;
  }

  static async articlesFeed(
    options?: ArticlesFeedRequestParams,
    token?: string,
  ): Promise<ArticleResponseBody> {
    const params = ApiClient.getURLParams(options);
    const url = `/articles/feed?${params}`;

    const response = await fetch(ApiClient.apiUrl + url, {
      method: 'GET',
      headers: ApiClient.getAuthHeaders(token ?? ''),
    });

    ApiClient.checkServerStatus(response.status);
    const body = await ApiClient.getJsonBody(response);
    if (!response.ok) {
      ApiClient.checkBodyErrors(body, ClientErrors.unableToGetArticles);
    }
    return body;
  }
}
