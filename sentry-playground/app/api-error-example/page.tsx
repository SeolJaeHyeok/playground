'use client';

import { httpClient } from '@/utils/http';
import { useEffect } from 'react';

const getData = async () => {
    const response = await httpClient.get('https://api.api-ninjas.com/v1/loremipsum?paragraphs=2');
    return response;
};

const postData = async (payload: { id: string; name: string }) => {
    const response = await httpClient.post(
        'https://api.api-ninjas.com/v1/loremipsum?paragraphs=2',
        payload,
    );
    return response;
};

export default function Page() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                // await getData();
                await postData({
                    id: '1234',
                    name: 'John Doe',
                });
            } catch (error) {}
        };
        fetchData();
    }, []);

    return <div>API Error Example</div>;
}
