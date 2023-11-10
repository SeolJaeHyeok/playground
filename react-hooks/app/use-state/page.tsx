'use client';

import { useEffect, useState } from 'react';

export default function page() {
    const [state, setState] = useState(0);

    useEffect(() => {
        setState((prev) => prev + 1);
        console.log('effect', state);
        setState((prev) => prev + 1);

        console.log('effect', state);
        setState((prev) => prev + 1);

        console.log('effect', state);
    }, []);

    return <div>useState</div>;
}
