import { logError } from '@/utils/sentry/logger.util';

export const runtime = 'nodejs';

const getData = async () => {
    const response = await fetch('https://api.api-ninjas.com/v1/loremipsum?paragraphs=2');
    console.log('response', response);

    if (!response.ok) {
        const error = new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        logError(error, {
            tags: {
                feature: 'server-component',
                api: 'api-ninjas',
            },
            extra: {
                url: 'https://api.api-ninjas.com/v1/loremipsum?paragraphs=2',
                status: response.status,
                statusText: response.statusText,
                timestamp: new Date().toISOString(),
            },
        });
        throw error;
    }
    return response;
};

export default async function Page() {
    let data;
    let errorOccurred = false;

    try {
        data = await getData();
    } catch (error) {
        console.error('Server component error:', error);
        errorOccurred = true;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Server Component Error Example</h1>
            {errorOccurred ? (
                <div
                    style={{
                        color: 'red',
                        backgroundColor: '#ffe6e6',
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                >
                    <h2>에러가 발생했습니다!</h2>
                    <p>이 에러는 서버 컴포넌트에서 발생했으며, Sentry로 전송되었습니다.</p>
                    <p>Sentry 대시보드에서 로그를 확인해주세요.</p>
                </div>
            ) : (
                <div
                    style={{
                        color: 'green',
                        backgroundColor: '#e6ffe6',
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                >
                    <h2>정상적으로 데이터를 가져왔습니다!</h2>
                    <p>API 호출이 성공했습니다.</p>
                </div>
            )}
        </div>
    );
}
