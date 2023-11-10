import { configure } from '@testing-library/react';
import { dataTestId } from './src/shared/constants';
import '@testing-library/jest-dom/jest-globals';

configure({ testIdAttribute: dataTestId });
