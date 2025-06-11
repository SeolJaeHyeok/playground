import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
    isAxiosError,
} from 'axios';
import { stringify } from 'qs';

import CustomError from '../custom-error';
import NProgress from '../n-progress';

class HttpClient {
    private static readonly instance: HttpClient = new HttpClient();
    private readonly axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create(this.defaultConfig);

        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }

    get defaultConfig(): AxiosRequestConfig {
        return {
            baseURL: 'https://example.api.com/v1',
            timeout: 10000,
            headers: {
                Authorization: `Bearer example token`,
            },
            paramsSerializer: {
                serialize: (params: any) => {
                    return stringify(params, { arrayFormat: 'repeat' });
                },
            },
        };
    }

    private httpInterceptorsRequest(): void {
        this.axiosInstance.interceptors.request.use(
            this.handleRequestSuccess,
            this.handleRequestError,
        );
    }

    private httpInterceptorsResponse(): void {
        this.axiosInstance.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError,
        );
    }

    public createConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
        return {
            ...this.defaultConfig,
            ...config,
            headers: {
                ...this.defaultConfig.headers,
                ...(config && config.headers),
            },
        };
    }

    private handleRequestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        NProgress.start();

        return config;
    }

    private handleRequestError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    private handleResponseSuccess(response: AxiosResponse): AxiosResponse {
        NProgress.done();
        return response;
    }

    private handleResponseError(error: any): Promise<any> {
        NProgress.done();

        return Promise.reject(error);
    }

    public static getInstance(): HttpClient {
        return HttpClient.instance;
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const mergedConfig = this.createConfig(config);
            const response: AxiosResponse<T> = await this.axiosInstance.request<T>(mergedConfig);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new CustomError('Axios Error Occured!', { details: error });
            }

            throw new CustomError('Runtime Error Occured', { details: error });
        }
    }

    public async get<T, P>(url: string, params?: P): Promise<T> {
        return this.request<T>({ method: 'get', url, params });
    }

    public async post<T, P>(url: string, data?: P, config?: AxiosRequestConfig): Promise<T> {
        const requestConfig: AxiosRequestConfig = {
            method: 'post',
            url,
            data,
            ...config,
        };
        return this.request<T>(requestConfig);
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const requestConfig: AxiosRequestConfig = {
            method: 'delete',
            url,
            ...config,
        };
        return this.request<T>(requestConfig);
    }

    public async patch<T, P>(url: string, data?: P, config?: AxiosRequestConfig): Promise<T> {
        const requestConfig: AxiosRequestConfig = {
            method: 'patch',
            url,
            data,
            ...config,
        };
        return this.request<T>(requestConfig);
    }

    public async put<T, P>(url: string, data?: P, config?: AxiosRequestConfig): Promise<T> {
        const requestConfig: AxiosRequestConfig = {
            method: 'put',
            url,
            data,
            ...config,
        };
        return this.request<T>(requestConfig);
    }
}

export const httpClient = HttpClient.getInstance();
