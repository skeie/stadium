import 'react-native';
import React from 'react';
import Button from '../Button';
import renderer from 'react-test-renderer';

it('Button renders correctly', () => {
    const tree = renderer.create(<Button>Snapshot test!</Button>).toJSON();
    expect(tree).toMatchSnapshot();
});

