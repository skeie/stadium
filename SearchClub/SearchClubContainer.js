// @flow

import React, { Component } from 'react';
// $FlowFixMe
import { graphql, QueryProps, compose } from 'react-apollo';
import { get } from '../api/fetch';
import type { Match } from '../components/MatchView';
import { searchClubQL, getMatchQL } from './SearchClubQL';
import { GetResultBytFootbalTeam } from './GetResultBytFootbalTeamGQL';
import SearchClubUI from './SearchClubComponent';
import tracking from '../util/tracking';

type Footballclub = {
  capacity: string,
  name: string,
  stadiumName: string,
};

type FootballclubResult = Array<Footballclub>;

type State = {
  footballclubResult: ?FootballclubResult,
  text: string,
  isVisible: boolean,
  loading: boolean,
};

type Props = {
  uri: string,
  date: string,
  onNext: Match => void,
  getClub: QueryProps,
  onGoBack: () => void,
  getMatch: QueryProps,
  onSelect?: () => *,
  title?: string,
  subTitle?: string,
};

class SearchClub extends Component<Props, State> {
  state = {
    text: '',
    isVisible: true,
    footballclubResult: [],
    loading: false,
  };

  timeout: number;

  componentDidMount() {
    tracking.screenView('SearchClub');
  }

  queryFootballClub = (text: string) => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      tracking.sendEvent({ searchQuery: text });
      const { data } = await this.props.getClub({
        variables: {
          clubName: text.trim(),
        },
      });
      this.setState({ text, footballclubResult: data.getClub, loading: false });
    }, 600);
  };

  getMatchData = async (club: Footballclub) => {
    const { data } = await this.props.getMatch({
      variables: {
        ...club,
        date: this.props.date,
      },
    });
    tracking.sendEvent({ selectedData: data });
    this.handleClubSelect(data);
  };

  handleClubSelect = ({ matchBasedOnFootballTeam }: any) => {
    matchBasedOnFootballTeam.uri = this.props.uri;
    matchBasedOnFootballTeam.date = this.props.date;
    this.setState({
      isVisible: false,
      footballclubResult: null,
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

  initGetMatchData = (club: Footballclub) => {
    this.setState(
      {
        loading: true,
        footballclubResult: null,
      },
      () => {
        this.getMatchData(club);
      },
    );
  };

  onHandleTextInput = (query: string) => {
    this.setState(
      {
        loading: true,
      },
      () => {
        this.queryFootballClub(query);
      },
    );
  };

  render() {
    const { onSelect = this.initGetMatchData, title, subTitle } = this.props;
    return (
      <SearchClubUI
        text={this.state.text}
        isVisible={this.state.isVisible}
        footballclubResult={this.state.footballclubResult}
        onHandleTextInput={this.onHandleTextInput}
        getMatchData={onSelect}
        fetching={this.state.loading}
        toggleModal={this.handleToggleModal}
        title={title}
        subTitle={subTitle}
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
