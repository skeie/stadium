// @flow

// $FlowFixMe
import { Constants } from 'expo';
import { Analytics, Hits as GAHits } from 'react-native-google-analytics';

const NO_OP = (event: string) => {};

let analytics = {};

const init = async () => {
  const userAgent = await Constants.getWebViewUserAgentAsync();
  const clientId = Constants.deviceId;
  analytics = new Analytics('UA-116753561-1', clientId, 1, userAgent);
};

const screenView = (screen: string) => {
  const screenView = new GAHits.ScreenView(screen);
  analytics.send(screenView);
};

const sendEvent = (event: any) => {
  const gEvent = new GAHits.Event(JSON.stringify(event));
  analytics.send(gEvent);
};

export default (__DEV__
  ? {
      screenView: NO_OP,
      sendEvent: (event: any) => {},
      init: NO_OP,
    }
  : {
      screenView,
      sendEvent,
      init,
    });
