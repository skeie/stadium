import 'react-native';
import React from 'react';
import TextInput from '../TextInput';
import renderer from 'react-test-renderer';

it('TextInput renders correctly', () => {
    const tree = renderer.create(<TextInput />).toJSON();
    expect(tree).toMatchSnapshot();
});

