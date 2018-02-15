// @flow

import * as React from 'react';
import { Connect, query, mutation } from 'urql';
import Loading from '../components/Loading';

type Props = {
    queryData: { query: string, data?: any },
    onLoaded: any => void,
};

const Query = ({ queryData, onLoaded }: Props) => {
    return (
        <Connect
            query={query(queryData.query, queryData.data)}
            children={({ loaded, fetching, refetch, data = {}, error }) => {
                if (data) {
                    onLoaded(data);
                }
                return <Loading />;
            }}
        />
    );
};

export default Query;
