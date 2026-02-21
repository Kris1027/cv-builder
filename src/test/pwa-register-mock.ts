import { useState } from 'react';

export const useRegisterSW = () => {
    const [offlineReady, setOfflineReady] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);

    return {
        offlineReady: [offlineReady, setOfflineReady] as const,
        needRefresh: [needRefresh, setNeedRefresh] as const,
        updateServiceWorker: () => {},
    };
};
