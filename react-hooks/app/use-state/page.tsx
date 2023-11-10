'use client';

import UseStateTestComponent from '@/components/use-state-component';
import { useEffect, useState } from 'react';

export default function Page() {
    const [state, setState] = useState(0);

    console.log('페이지 렌더링', state);

    useEffect(() => {
        setState((prev) => prev + 1);
        console.log('effect', state);
        setState((prev) => prev + 1);

        console.log('effect', state);
        setState((prev) => prev + 1);

        console.log('effect', state);
    }, []);

    return (
        <div>
            <UseStateTestComponent state={state} />
            <button onClick={() => setState((prev) => prev + 1)}>클릭</button>
        </div>
    );
}
