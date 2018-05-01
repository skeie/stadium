import 'react-native';
import React from 'react';
import { StatisticsContainer } from './StatisticsContainer';
import { shallow } from 'enzyme';
import testdata from '../testData/gridView';

const wrapper = shallow(
  <StatisticsContainer
    feed={{
      feed: testdata,
      loading: false,
    }}
  />,
);

const res = wrapper.instance().data(testdata);

it('Should have the correct year', () => {
  expect(res.years).toEqual({
    2016: testdata.length,
  });
});

it('Should have the avg goals', () => {
  expect(res.avgGoal).toEqual(4);
});

it('Should have the total goals', () => {
  expect(res.totalGoals).toEqual(4 * testdata.length);
});

it('Should have the number of vicotires', () => {
  expect(res.even).toEqual(testdata.length - 2);
  expect(res.homeVictory).toEqual(1);
  expect(res.awayVictory).toEqual(1);
});

it('Should have fav team', () => {
  expect(res.clubs['AC Milan']).toEqual(2);
  expect(res.clubs['Internazionale']).toEqual(1);
  expect(res.favClub.club).toEqual('AC Milan');
});
