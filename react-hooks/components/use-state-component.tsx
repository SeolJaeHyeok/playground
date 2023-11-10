import { useState } from 'react';

export default function UseStateTestComponent(props: { state: number }) {
    const [state, setState] = useState(props);

    console.log('컴포넌트 렌더링', state);
    return <div>UseStateTestComponent</div>;
}
