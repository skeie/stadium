import React from 'react';
import { View } from 'react-native';
import MatchView from '../MatchView/MatchViewContainer';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';
// const props = {
//     lat: 51.474821666666664,
//     long: 0.22192833333333334,
//     date: '2017/11/18',
//     uri:
//         'data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/…KACilFJQAUUUooASiiigAoopaAEpaSloASiiigApaKKAP/9k=',
// };

const props = {
  user: { name: 'Skeie', __typename: 'User' },
  id: 'cjfgxh5x7002u0955i9j3urr5',
  date: '2017/11/18',
  startTime: '20:45',
  homeTeam: 'Barcelona',
  awayTeam: 'Roma',
  uri: 'http://res.cloudinary.com/dsqjhbvbj/image/upload/v1516443582/aubxdtkgsxiuuirkfaot.jpg',
  goalsHomeTeam: 6,
  goalsAwayTeam: 1,
  created: '2018/04/01',
  updated: '2018/04/01',
  stadium: {
    name: 'Camp Nou',
    capacity: 121749,
    footballTeamName: 'Barcelona',
    updated: '2018/04/01',
    __typename: 'Stadiums',
  },
  goalScorers: [
    {
      name: 'L. Suárez',
      minute: '13, 17, 19',
      team: 'Barcelona',
      updated: '2018/04/01',
      __typename: 'GoalScorers',
    },
    {
      name: 'L. Messi',
      minute: '13',
      team: 'Barcelona',
      updated: '2018/04/01',
      __typename: 'GoalScorers',
    },
    {
      name: 'Adriano',
      minute: '13',
      team: 'Barcelona',
      updated: '2018/04/01',
      __typename: 'GoalScorers',
    },
    {
      name: 'E. Dzeko',
      minute: '13',
      team: 'Roma',
      updated: '2018/04/01',
      __typename: 'GoalScorers',
    },
    {
      name: 'G. Pique',
      minute: '13',
      team: 'Barcelona',
      updated: '2018/04/01',
      __typename: 'GoalScorers',
    },
  ],
  __typename: 'Matches',
};

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  sap = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'RootStackNavigator' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View paddingTop={40} flex={1}>
        <MatchView match={props} uri={props.uri} goBack={this.sap} />
      </View>
    );
  }
}
