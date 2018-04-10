// @flow

import React, { Component } from 'react';
import NoMetaData from './NoMetaData';
import tracking from '../util/tracking';

type State = {
  isVisible: boolean,
};

type Props = {
  onGoBack: () => void,
};

class NoMetaDataContainer extends Component<Props, State> {
  componentDidMount() {
    tracking.screenView('NoMetaData');
  }

  state = {
    isVisible: true,
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
    return <NoMetaData isVisible={this.state.isVisible} toggleModal={this.handleToggleModal} />;
  }
}

export default NoMetaDataContainer;
