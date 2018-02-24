// @flow

import React, { Component } from 'react';

import { get } from '../api/fetch';
import { Connect, query, mutation } from 'urql';
import type { Match } from '../components/MatchView';
import { searchClubQL } from './SearchClubQL';
import Query from '../query/Query';
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
        this.timeout = setTimeout(() => {
            this.setState({ text });
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

    getQuery = () => (this.state.text ? query(searchClubQL, { clubName: this.state.text }) : null);

    render() {
        if (this.state.data) {
            return (
                <Query
                    onLoaded={this.handleClubSelect}
                    queryData={{ query: GetResultBytFootbalTeam, data: this.state.data }}
                />
            );
        }
        return (
            <Connect
                query={this.getQuery()}
                children={({ loaded, fetching, refetch, data = {}, error }) => {
                    let footballclubResult = [];
                    if (data && data.getClub) footballclubResult = data.getClub;
                    return (
                        <SearchClubUI
                            text={this.state.text}
                            isVisible={this.state.isVisible}
                            footballclubResult={footballclubResult}
                            onHandleTextInput={this.onHandleTextInput}
                            getMatchData={this.getMatchData}
                            fetching={fetching}
                        />
                    );
                }}
            />
        );
    }
}

export default SearchClub;
