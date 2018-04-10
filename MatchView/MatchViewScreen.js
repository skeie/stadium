// @flow

import React from 'react';
import MatchView from './MatchVievHOC';
import MatchViewWithData from './MatchViewContainer';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';
export default class MatchViewScreen extends React.Component<*, *> {
  static navigationOptions = {
    header: null,
  };

  handleFinish = () => {
    this.reset({ forceRefetch: true });
  };

  goBack = () => {
    this.reset();
  };

  reset = (props?: Object = {}) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main', params: { ...props } })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    if (this.props.navigation.state.params.match) {
      return (
        <MatchViewWithData
          {...this.props.navigation.state.params}
          goBack={this.goBack}
          onFinish={this.handleFinish}
          uri={this.props.navigation.state.params.match.uri}
        />
      );
    }
    return (
      <MatchView
        {...this.props.navigation.state.params}
        goBack={this.goBack}
        onFinish={this.handleFinish}
      />
    );
  }
}
