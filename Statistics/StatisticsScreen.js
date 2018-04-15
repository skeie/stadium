// @flow

import React from 'react';
import Statistics from './StatisticsContainer';

class StatisticsScreen extends React.Component<*, *> {
  static navigationOptions = {
    header: null,
  };

  handleStatistics = () => {
    const { navigate } = this.props.navigation;
    navigate('Main', { showFirstTimeView: true });
  };

  render() {
    return <Statistics onStatistics={this.handleStatistics} />;
  }
}

export default StatisticsScreen;
