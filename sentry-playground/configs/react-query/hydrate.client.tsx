'use client';

import { HydrateProps, Hydrate as RQHydrate } from '@tanstack/react-query';

// Dehydrate된 state를 클라이언트 컴포넌트에서 사용하기 위한 Custom Hydrate Component
function Hydrate(props: HydrateProps) {
    return <RQHydrate {...props} />;
}

export default Hydrate;
