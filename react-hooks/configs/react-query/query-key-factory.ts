// react query key를 관리하는 factory 함수
export const exampleKeys = {
    all: ['example'] as const,
    lists: () => [...exampleKeys.all] as const,
    list: (filters: any) => [...exampleKeys.lists(), { filters }] as const,
};
