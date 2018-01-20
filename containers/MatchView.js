// @flow

import React, { Component } from 'react';
import MatchViewUI from '../components/MatchView';
import { post } from '../api/fetch';

class MatchView extends Component<*, *> {
    handlePostMatch = async () => {
        const { isEdit, ...match } = this.props;
        const newGridView = await post('/matches', { ...match });
        this.props.navigation.navigate('Homescreen', { ...newGridView });
    };

    render() {
        return <MatchViewUI onPostMatch={this.handlePostMatch} {...this.props} />;
    }
}

export default MatchView;
