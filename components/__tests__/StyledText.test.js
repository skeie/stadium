import 'react-native';
import React from 'react';
import { MonoText, Poppins } from '../StyledText';
import renderer from 'react-test-renderer';

it('Mono renders correctly', () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
it('Poppins renders correctly', () => {
  const tree = renderer.create(<Poppins>Snapshot test!</Poppins>).toJSON();

  expect(tree).toMatchSnapshot();
});
