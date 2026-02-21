import { describe, it, expect, vi, beforeEach } from 'vitest';

// We need to test safeStorage behavior when localStorage works and when it doesn't.
// Since the module evaluates availability on import, we test the normal path here.

describe('safeStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should store and retrieve values', async () => {
        const { safeStorage } = await import('./storage');
        const result = safeStorage.setItem('test-key', 'test-value');
        expect(result).toBe(true);
        expect(safeStorage.getItem('test-key')).toBe('test-value');
    });

    it('should return null for missing keys', async () => {
        const { safeStorage } = await import('./storage');
        expect(safeStorage.getItem('nonexistent')).toBeNull();
    });

    it('should remove values', async () => {
        const { safeStorage } = await import('./storage');
        safeStorage.setItem('remove-key', 'value');
        safeStorage.removeItem('remove-key');
        expect(safeStorage.getItem('remove-key')).toBeNull();
    });

    it('should handle localStorage.getItem throwing', async () => {
        const { safeStorage } = await import('./storage');
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('SecurityError');
        });

        expect(safeStorage.getItem('key')).toBeNull();
        expect(spy).toHaveBeenCalled();

        vi.restoreAllMocks();
    });

    it('should handle localStorage.setItem throwing', async () => {
        const { safeStorage } = await import('./storage');
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new DOMException('QuotaExceededError');
        });

        // Should not throw — falls back to in-memory and returns false
        const result = safeStorage.setItem('quota-key', 'value');
        expect(result).toBe(false);
        expect(spy).toHaveBeenCalled();

        vi.restoreAllMocks();
    });

    it('should handle localStorage.removeItem throwing', async () => {
        const { safeStorage } = await import('./storage');
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
            throw new Error('SecurityError');
        });

        // Should not throw
        safeStorage.removeItem('key');
        expect(spy).toHaveBeenCalled();

        vi.restoreAllMocks();
    });
});
