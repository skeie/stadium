// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import MatchViewUI from '../components/MatchView';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { post } from '../api/fetch';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';
// $FlowFixMe
import { graphql, QueryProps } from 'react-apollo';
import colors from '../constants/Colors';
import { MatchMutation } from './MatchViewQL';
import { uploadPhoto } from '../api/fetch';
import omitDeep from 'omit-deep-lodash';

import type { Match } from '../components/MatchView';

type Props = {
  lat: number,
  long: number,
  uri: string,
  match: any,
  goBack: () => void,
  matchMutation: QueryProps,
};

class MatchViewWithData extends Component<Props, *> {
  image: string;

  componentDidMount() {
    if (!__DEV__) {
      this.uploadPhoto();
    } else {
      this.image = 'https://files.graph.cool/cjdizt45h14ca016541zn4b91/cjdj0ihen0ris01022fxo8dkg';
    }
  }

  uploadPhoto = async () => {
    const image = await uploadPhoto(this.props.uri);
    this.image = image.url;
  };

  render() {
    const { uri, ...rest } = this.props;
    console.log('sapdap 1 1');
    return (
      <View flex={1}>
        <MatchViewUI {...this.props.match} />
        <View
          flexDirection="row"
          height="15%"
          backgroundColor={colors.primary}
          alignItems="center"
          justifyContent="space-around"
        >
          <Button style={{ width: '40%' }}>Discard</Button>

          <Button
            style={{ width: '40%' }}
            onPress={async () => {
              const match = omitDeep(this.props.match, '__typename');
              const lol = await this.props.matchMutation({
                variables: { ...match, uri: this.image },
              });
              debugger;
              this.props.goBack();
            }}
          >
            Save
          </Button>
        </View>
      </View>
    );
  }
}
export default graphql(MatchMutation, { name: 'matchMutation' })(MatchViewWithData);
