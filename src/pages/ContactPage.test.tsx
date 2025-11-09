import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactPage from './ContactPage';

// Mock the useIntersectionObserver hook to make elements always visible for testing
vi.mock('../hooks/useIntersectionObserver', () => ({
  default: () => [null, true],
}));

describe('ContactPage Integration Test', () => {
  it('should show validation errors when submitting an empty form', async () => {
    render(<ContactPage />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Email is required.')).toBeInTheDocument();
    expect(await screen.findByText('Message is required.')).toBeInTheDocument();
  });
});
