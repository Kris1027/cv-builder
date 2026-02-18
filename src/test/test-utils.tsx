import { cleanup, render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { afterEach } from 'vitest';

import i18n from './i18n-test';

afterEach(() => {
    cleanup();
});

const AllProviders = ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllProviders, ...options });

export { customRender as render, userEvent };
export { screen, within } from '@testing-library/react';
