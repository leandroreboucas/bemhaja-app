export enum QueryKeys {
  UserGetById = 'UserGetById',
  UserGetProfile = 'UserGetProfile',
  UserGetAll = 'UserGetAll',

  FriendGetAll = 'FriendGetAll',

  FeedList = 'FeedList',

  BehaviorGetAll = 'BehaviorGetAll',

  EventGetListMyEventsParticipants = 'EventGetListMyEventsParticipants',
  EventGetListMyEvents = 'EventGetListMyEvents',
  EventGetListEventsNotCreatedForMe = 'EventGetListEventsNotCreatedForMe',
}

export interface MutationOptions<TData> {
  onSucess?: (data: TData) => void;
  onError?: (message: string) => void;
  errorMessage?: string;
}
