import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';

// 싱글톤 인스턴스를 생성하여 앱 전체에서 하나의 쿼리 클라이언트를 공유하기 위해 설정
const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;
