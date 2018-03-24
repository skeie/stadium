// @flow

import React, { Component } from 'react';
// $FlowFixMe
import { graphql, QueryProps, compose } from 'react-apollo';
import { get } from '../api/fetch';
import type { Match } from '../components/MatchView';
import { searchClubQL, getMatchQL } from './SearchClubQL';
import { GetResultBytFootbalTeam } from './GetResultBytFootbalTeamGQL';
import SearchClubUI from './SearchClubComponent';

type Footballclub = {
  capacity: string,
  name: string,
  stadiumName: string,
};

type FootballclubResult = Array<Footballclub>;

type State = {
  footballclubResult: FootballclubResult,
  text: string,
  isVisible: boolean,
  data?: any,
};

type Props = {
  uri: string,
  date: string,
  onNext: Match => void,
  getClub: QueryProps,
  onGoBack: () => void,
  getMatch: QueryProps,
};

class SearchClub extends Component<Props, State> {
  state = {
    text: '',
    isVisible: true,
    footballclubResult: [],
  };

  timeout: number;

  onHandleTextInput = (text: string) => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      const { data } = await this.props.getClub({
        variables: {
          clubName: text,
        },
      });
      this.setState({ text, footballclubResult: data.getClub });
    }, 600);
  };

  getMatchData = async (club: Footballclub) => {
    const { data } = await this.props.getMatch({
      variables: {
        ...club,
        date: this.props.date,
      },
    });
    this.handleClubSelect(data);
  };

  handleClubSelect = ({ matchBasedOnFootballTeam }: any) => {
    matchBasedOnFootballTeam.uri = this.props.uri;
    matchBasedOnFootballTeam.date = this.props.date;
    this.setState({
      isVisible: false,
      data: null,
    });

    this.props.onNext(matchBasedOnFootballTeam);
  };

  handleToggleModal = () => {
    this.setState(
      ({ isVisible }) => ({
        isVisible: !isVisible,
      }),
      this.props.onGoBack,
    );
  };

  render() {
    console.log('sapdap', this.props);
    return (
      <SearchClubUI
        text={this.state.text}
        isVisible={this.state.isVisible}
        footballclubResult={this.state.footballclubResult}
        onHandleTextInput={this.onHandleTextInput}
        getMatchData={this.getMatchData}
        fetching={false}
        toggleModal={this.handleToggleModal}
      />
    );
  }
}

export default compose(
  graphql(searchClubQL, {
    name: 'getClub',
  }),
  graphql(getMatchQL, {
    name: 'getMatch',
  }),
)(SearchClub);
