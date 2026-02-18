import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test/test-utils';

import { FieldError } from './field-error';

describe('FieldError', () => {
    it('renders nothing when isTouched is false', () => {
        const { container } = render(
            <FieldError errors={['validation.firstNameRequired']} isTouched={false} />,
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders nothing when errors are empty', () => {
        const { container } = render(<FieldError errors={[]} isTouched={true} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders translated error when touched', () => {
        render(<FieldError errors={['validation.firstNameRequired']} isTouched={true} />);
        expect(screen.getByText('First name is required')).toBeInTheDocument();
    });

    it('handles object errors with message property', () => {
        render(
            <FieldError
                errors={[{ message: 'validation.invalidEmail' }]}
                isTouched={true}
            />,
        );
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    it('filters undefined errors', () => {
        render(
            <FieldError
                errors={[undefined, 'validation.lastNameRequired', undefined]}
                isTouched={true}
            />,
        );
        expect(screen.getByText('Last name is required')).toBeInTheDocument();
    });

    it('joins multiple errors with comma', () => {
        render(
            <FieldError
                errors={['validation.firstNameRequired', 'validation.lastNameRequired']}
                isTouched={true}
            />,
        );
        expect(
            screen.getByText('First name is required, Last name is required'),
        ).toBeInTheDocument();
    });
});
