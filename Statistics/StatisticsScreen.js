// @flow

import React from 'react';
import Statistics from './StatisticsContainer';

class StatisticsScreen extends React.Component<*, *> {
  static navigationOptions = {
    header: null,
  };

  onHandleGoToPhoto = () => {
    const { navigate } = this.props.navigation;
    navigate('Photo');
  };

  render() {
    return <Statistics onGoToPhoto={this.onHandleGoToPhoto} />;
  }
}

export default StatisticsScreen;
