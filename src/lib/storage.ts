const fallbackStore = new Map<string, string>();

const isLocalStorageAvailable = (): boolean => {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
};

const available = isLocalStorageAvailable();

if (!available) {
    console.warn('localStorage is not available. Using in-memory fallback.');
}

export const safeStorage = {
    getItem(key: string): string | null {
        try {
            if (available) {
                return localStorage.getItem(key);
            }
        } catch (error) {
            console.warn(`Failed to read "${key}" from localStorage:`, error);
        }
        return fallbackStore.get(key) ?? null;
    },

    setItem(key: string, value: string): void {
        try {
            if (available) {
                localStorage.setItem(key, value);
                return;
            }
        } catch (error) {
            console.warn(`Failed to write "${key}" to localStorage:`, error);
        }
        fallbackStore.set(key, value);
    },

    removeItem(key: string): void {
        try {
            if (available) {
                localStorage.removeItem(key);
                return;
            }
        } catch (error) {
            console.warn(`Failed to remove "${key}" from localStorage:`, error);
        }
        fallbackStore.delete(key);
    },
};
