'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

function RQProvider({ children }: React.PropsWithChildren) {
    const [client] = React.useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 3 * 60 * 1000,
                    retry: 2,
                    cacheTime: 3 * 60 * 1000,
                    refetchOnWindowFocus: false,
                    retryDelay: 1000,
                },
            },
        }),
    );

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default RQProvider;
