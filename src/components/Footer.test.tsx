import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should display the current year in the copyright notice', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `© ${currentYear} Computer Science Department | All Rights Reserved`
    );
    expect(copyrightText).toBeInTheDocument();
  });
});
