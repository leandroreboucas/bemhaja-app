import {AppTabRoutes} from '@routes';

import {IconNames} from '../Icon';

export const mapScreenToProps: Record<
  keyof AppTabRoutes,
  {
    label: string;
    icon: IconNames;
    size: number;
  }
> = {
  HomeScreen: {
    label: 'Início',
    icon: 'home',
    size: 24,
  },
  EventsScreen: {
    label: 'Eventos',
    icon: 'events',
    size: 24,
  },
  ActionSheetScreen: {
    label: '',
    icon: 'home',
    size: 56,
  },
  FriendsScreen: {
    label: 'Amigos',
    icon: 'friends',
    size: 24,
  },
  GroupsScreen: {
    label: 'Mundo',
    icon: 'world',
    size: 24,
  },
};
