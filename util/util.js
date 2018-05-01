import { AsyncStorage } from 'react-native';

const IS_FIRST_TIME = 'IS_FIRST_TIME';

export const isFirstTime = AsyncStorage.getItem(IS_FIRST_TIME);