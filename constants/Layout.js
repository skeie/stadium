import { Dimensions } from 'react-native';
import { LayoutAnimation } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    customLayoutLinear: {
        duration: 300,
        create: {
            type: LayoutAnimation.Types.easeOut,
            property: LayoutAnimation.Properties.opacity,
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
            springDamping: 0.1,
        },
        delete: {
            type: LayoutAnimation.Types.easeIn,
            property: LayoutAnimation.Properties.opacity,
        },
    },
};
