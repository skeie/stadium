import 'react-native';
import React from 'react';
import EmptyHomeView from '../EmptyHomeView';
import renderer from 'react-test-renderer';

it('EmptyHomeView renders correctly', () => {
    const tree = renderer.create(<EmptyHomeView />).toJSON();
    expect(tree).toMatchSnapshot();
});

