import { useState, useEffect } from 'react';

import { FeedDTO } from '../../types';
import { feedService } from '../feedService';

export function useFeedList() {
    const [feedList, setFeedList] = useState<FeedDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    async function fetchInitialData() {
        try {
            setError(false);
            setLoading(true);
            const { data, meta } = await feedService.getList(1);
            setFeedList(data);
            if (meta.hasNextPage) {
                setPage(2);
            } else {
                setHasNextPage(false);
            }
        } catch (err) {
            console.log(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    async function fetchNextPage() {
        if (loading || !hasNextPage) {
            return;
        }
        try {
            setLoading(true);
            const { data, meta } = await feedService.getList(page);
            setFeedList(prev => [...prev, ...data]);
            if (meta.hasNextPage) {
                setPage(prev => prev + 1);
            } else {
                setHasNextPage(false);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInitialData();
    }, []);

    return {
        feedList,
        loading,
        error,
        refresh: fetchInitialData,
        fetchNextPage,
    };
}
