import { faker } from '@faker-js/faker';
import { autoUserPrefix } from '../shared/constants';
import { TestHelper } from './test.helper';
import { User } from '../shared/types';

export class TestDataHelper {
  static getUser(): User {
    return {
      username: `${autoUserPrefix}${TestHelper.getRunId()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
