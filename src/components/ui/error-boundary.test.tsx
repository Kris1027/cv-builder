import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { ErrorBoundary } from './error-boundary';

const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>Child content</div>;
};

describe('ErrorBoundary', () => {
    it('should render children when no error occurs', () => {
        render(
            <ErrorBoundary>
                <ThrowingComponent shouldThrow={false} />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should show fallback UI when a child throws', () => {
        // Suppress React's error boundary console.error output
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ErrorBoundary>
                <ThrowingComponent shouldThrow={true} />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
        expect(
            screen.getByText('An unexpected error occurred. Please try again.'),
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();

        spy.mockRestore();
    });

    it('should reset and re-render children when "Try Again" is clicked', async () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
        let shouldThrow = true;

        const ConditionalThrow = () => {
            if (shouldThrow) {
                throw new Error('Test error');
            }
            return <div>Recovered content</div>;
        };

        render(
            <ErrorBoundary>
                <ConditionalThrow />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();

        // Fix the error before clicking retry
        shouldThrow = false;

        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'Try Again' }));

        expect(screen.getByText('Recovered content')).toBeInTheDocument();

        spy.mockRestore();
    });

    it('should call onError callback when an error occurs', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const handleError = vi.fn();

        render(
            <ErrorBoundary onError={handleError}>
                <ThrowingComponent shouldThrow={true} />
            </ErrorBoundary>,
        );

        expect(handleError).toHaveBeenCalledOnce();
        expect(handleError).toHaveBeenCalledWith(
            expect.objectContaining({ message: 'Test error' }),
            expect.objectContaining({ componentStack: expect.any(String) }),
        );

        spy.mockRestore();
    });

    it('should show error details in expandable section', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ErrorBoundary>
                <ThrowingComponent shouldThrow={true} />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Error details')).toBeInTheDocument();
        expect(screen.getByText('Test error')).toBeInTheDocument();

        spy.mockRestore();
    });

    it('should use custom fallback when provided', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const customFallback = ({ error }: { error: Error; resetErrorBoundary: () => void }) => (
            <div>Custom fallback: {error.message}</div>
        );

        render(
            <ErrorBoundary fallback={customFallback}>
                <ThrowingComponent shouldThrow={true} />
            </ErrorBoundary>,
        );

        expect(screen.getByText('Custom fallback: Test error')).toBeInTheDocument();

        spy.mockRestore();
    });
});
