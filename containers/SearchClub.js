// @flow

import React, { Component } from 'react';
// $FlowFixMe
import { graphql, QueryProps } from 'react-apollo';
import { get } from '../api/fetch';
import type { Match } from '../components/MatchView';
import { searchClubQL } from './SearchClubQL';
import { GetResultBytFootbalTeam } from './GetResultBytFootbalTeamGQL';
import SearchClubUI from '../components/SearchClub';

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
                    clubName: text
                }
            });
            this.setState({ text, footballclubResult: data.getClub });
        }, 600);
    };

    getMatchData = (club: Footballclub) => {
        this.setState({
            data: { ...club, date: this.props.date },
        });
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
        this.setState(({ isVisible }) => ({
            isVisible: !isVisible
        }), this.props.onGoBack);
    }

    render() {
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
        )
    }
}

export default graphql(searchClubQL, {
    name: 'getClub',
})(SearchClub);
