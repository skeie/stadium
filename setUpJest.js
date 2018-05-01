// @flow

/* eslint import/no-extraneous-dependencies: 0 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// $FlowFixMe (-> jest-enzyme. Required module not found)
require('jest-enzyme');

configure({ adapter: new Adapter() });