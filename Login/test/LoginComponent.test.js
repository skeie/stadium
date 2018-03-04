/* eslint flowtype/require-valid-file-annotation: 0 */
/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import Login from '../LoginComponents'

const onInputChange = jest.fn();

describe('Login component', () => {
    it('render login layout', () => {
        const wrapper = shallow((
            <Login isSignup={false} onInputChange={onInputChange} />
        ));
        expect(wrapper).toMatchSnapshot();
    })
    it('render signup layout', () => {
        const wrapper = shallow((
            <Login isSignup onInputChange={onInputChange} />
        ));
        expect(wrapper).toMatchSnapshot();
    })
})
