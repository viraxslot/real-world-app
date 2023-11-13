import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), 'e2e', 'config', '.env');
dotenv.config({ path: envPath });

export const TestConfig = {
  baseUrl: process.env.BASE_URL,
};
