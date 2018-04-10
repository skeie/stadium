// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import MatchViewUI from '../components/MatchView';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { post } from '../api/fetch';
import colors from '../constants/Colors';
import { MatchMutation, MatchQuery } from './MatchViewQL';
import { uploadPhoto } from '../api/fetch';
// $FlowFixMe
import { graphql, compose, QueryProps } from 'react-apollo';
import omitDeep from 'omit-deep-lodash';
import type { Match } from '../components/MatchView';
import { updateGoalscorer } from './matchViewUtil';
import MatchView from './MatchViewContainer';

type Props = {
  date: string,
  lat: number,
  long: number,
  uri: string,
  matchQuery: QueryProps,
  matchMutation: *,
  goBack: () => void,
  onFinish: () => void,
};

class MatchViewContainer extends Component<Props, *> {
  state = {
    match: null,
    loading: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.matchQuery.loading && this.props.matchQuery.loading) {
      const { match } = nextProps.matchQuery;
      const props = { ...match, date: this.props.date };
      this.setState({
        match: props,
      });
    }
  }

  render() {
    const { loading } = this.props.matchQuery;
    if (loading && !this.state.match) {
      return (
        <View flex={1} justifyContent="center" alignItems="center">
          <Loading />
        </View>
      );
    }
    console.log('sapdap', this.props);
    return (
      <MatchView
        match={this.state.match}
        goBack={this.props.goBack}
        uri={this.props.uri}
        onFinish={this.props.onFinish}
      />
    );
  }
}

export default compose(
  graphql(MatchQuery, {
    name: 'matchQuery',
  }),
)(MatchViewContainer);
