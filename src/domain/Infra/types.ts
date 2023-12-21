export enum QueryKeys {
  UserGetById = 'UserGetById',
  UserGetProfile = 'UserGetProfile',
  FeedList = 'FeedList',
  BehaviorGetAll = 'BehaviorGetAll',
  UserGetAll = 'UserGetAll',
  FriendGetAll = 'FriendGetAll',
  EventGetListMyEvents = 'EventGetListMyEvents',
}

export interface MutationOptions<TData> {
  onSucess?: (data: TData) => void;
  onError?: (message: string) => void;
  errorMessage?: string;
}
