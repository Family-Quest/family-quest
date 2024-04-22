/* eslint-disable global-require */
// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';

import * as dotenv from 'dotenv';
import { Platform } from 'react-native';

import pkg from './package.json';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

dotenv.config({ path: '.env.local' });

const {
  major = '0',
  minor = '0',
  patch = '0',
} = /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/giu.exec(
  pkg.dependencies['react-native'],
)?.groups ?? {};

Platform.constants.reactNativeVersion = {
  major: Number.parseInt(major, 10),
  minor: Number.parseInt(minor, 10),
  patch: Number.parseInt(patch, 10),
};
