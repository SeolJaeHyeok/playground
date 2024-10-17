import { httpClient } from '@/utils/http';

interface IExampleResponse {}

interface IExampleParams {}

export const exampleApi = {
    getExample: async () =>
        httpClient.get<IExampleResponse, IExampleParams>('https://example/api/example'),
};
