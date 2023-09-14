import {useNavigation} from '@react-navigation/native';

import {IAppNavigatorRoutesProps} from '@routes';

export function useAppNavigation() {
  return useNavigation<IAppNavigatorRoutesProps>();
}
