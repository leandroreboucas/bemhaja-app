import {useNavigation} from '@react-navigation/native';

import {IAuthNavigatorRoutesProps} from '@routes';

export function useAuthNavigation() {
  return useNavigation<IAuthNavigatorRoutesProps>();
}
