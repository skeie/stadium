// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
// $FlowFixMe
import { graphql, compose, QueryProps } from 'react-apollo';
import MatchViewUI from '../components/MatchView';
import { MatchMutation } from './MatchViewQL';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { post } from '../api/fetch';
import colors from '../constants/Colors';
import { uploadPhoto } from '../api/fetch';
import omitDeep from 'omit-deep-lodash';
import type { Match } from '../components/MatchView';
import { updateGoalscorer } from './matchViewUtil';
import tracking from '../util/tracking';
import SearchClubContainer from '../SearchClub/SearchClubContainer';

type Props = {
  match: Match,
  goBack: () => void,
  uri: string,
  matchMutation: QueryProps,
  onFinish: () => void,
  getClub: QueryProps,
};

type State = {
  url: ?string,
  match: Match,
  loading: boolean,
  showModal: boolean,
};

class MatchViewContainer extends Component<Props, State> {
  image: { url: string };
  timeout: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      url: null,
      match: this.props.match,
      loading: false,
      showModal: false,
    };
  }

  componentDidMount() {
    if (!this.props.match) {
      alert('Sorry, something went wrong, please try again');
      this.props.goBack();
    }
  }

  changeMatch = (property: string) => (value: string) => {
    this.setState(({ match }) => ({
      match: {
        ...match,
        [property]: value,
        goalScorers: updateGoalscorer(
          value,
          match.goalScorers,
          this.state.match ? this.state.match.homeTeam : '',
        ),
      },
    }));
  };

  handleChangeHomeTeam = this.changeMatch('homeTeam');

  componentDidMount() {
    tracking.screenView('MatchView');
    if (!__DEV__) {
      this.uploadPhoto();
    } else {
      this.setState({
        url: 'https://files.graph.cool/cjdizt45h14ca016541zn4b91/cjdj0ihen0ris01022fxo8dkg',
      });
    }
  }

  uploadPhoto = async () => {
    try {
      const image = await uploadPhoto(this.props.uri);
      this.setState({
        url: image.url,
      });
    } catch (error) {
      console.log('error in upload photo', error);
    }
  };

  handleSave = () => {
    this.setState(
      {
        loading: true,
      },
      this.postData,
    );
  };

  postData = async () => {
    const cleanMatch = omitDeep(this.state.match, '__typename');
    const match = { ...cleanMatch, uri: this.state.url };
    try {
      await this.props.matchMutation({
        variables: {
          ...match,
        },
      });
      this.props.onFinish();
    } catch (error) {
      console.log('something bad happen, try again', error);
    }
  };

  handleGetClub = (stadium: *) => {
    this.setState({
      showModal: false,
      match: {
        ...this.state.match,
        stadium: {
          name: stadium.stadiumName,
          capacity: stadium.capacity,
        },
      },
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    if (!this.state.url) {
      return (
        <View flex={1} justifyContent="center" alignItems="center">
          <Loading />
        </View>
      );
    }
    const match = { ...this.state.match, uri: this.state.url };
    return (
      <View flex={1}>
        <MatchViewUI
          editable
          onChangeStadium={this.toggleModal}
          onChangeHomeTeam={this.handleChangeHomeTeam}
          {...match}
        />
        <View
          flexDirection="row"
          height="15%"
          backgroundColor={colors.primary}
          alignItems="center"
          justifyContent="space-around"
        >
          <Button style={{ width: '40%' }} onPress={this.props.goBack}>
            Discard
          </Button>
          <Button style={{ width: '40%' }} onPress={this.handleSave} loading={this.state.loading}>
            Save
          </Button>
        </View>
        {this.state.showModal && (
          <SearchClubContainer
            title="Change stadium"
            subTitle="Write the name of the club, and select their stadium"
            onGoBack={this.toggleModal}
            onSelect={this.handleGetClub}
          />
        )}
      </View>
    );
  }
}

export default compose(
  graphql(MatchMutation, {
    name: 'matchMutation',
  }),
)(MatchViewContainer);
