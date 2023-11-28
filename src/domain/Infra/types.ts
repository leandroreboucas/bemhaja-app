export enum QueryKeys {
    UserGetById = 'UserGetById',
    UserGetProfile = 'UserGetProfile',
    FeedList = 'FeedList',
}

export interface MutationOptions<TData> {
    onSucess?: (data: TData) => void;
    onError?: (message: string) => void;
    errorMessage?: string;
}
