// @flow

import React from 'react';
import MatchView from '../containers/MatchView';
import MatchViewWithData from '../containers/MatchViewWithData';

export default class MatchViewScreen extends React.Component<*, *> {
    static navigationOptions = {
        title: 'MatchView',
    };

    render() {
        if (this.props.navigation.state.params.match) {
            return <MatchViewWithData {...this.props.navigation.state.params} />;
        }
        return <MatchView {...this.props.navigation.state.params} />;
    }
}
