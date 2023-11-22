export enum QueryKeys {
    UserGetById = 'UserGetById',
    FeedList = 'FeedList',
}

export interface MutationOptions<TData> {
    onSucess?: (data: TData) => void;
    onError?: (message: string) => void;
    errorMessage?: string;
}
