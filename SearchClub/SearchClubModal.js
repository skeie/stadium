// @flow

import React from 'react';
import SearchClub from './SearchClubContainer';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';

import type { Match } from '../components/MatchView';

export default class GetPhotoScreen extends React.Component<*, *> {
    handleNext = (resultData: Match) => {
        this.props.navigation.navigate('MatchView', { match: resultData, isEdit: true });
    };

    handleGoBack = () => {
        // Hack to go back to main menu
        this.props.navigation.goBack();
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    }

    render() {
        const { date, uri } = this.props.navigation.state.params;
        return <SearchClub date={date} uri={uri} onNext={this.handleNext} onGoBack={this.handleGoBack} />;
    }
}
