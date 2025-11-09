// FIX: Added a triple-slash directive to include Cypress type definitions, which resolves errors for `describe`, `it`, and `cy`.
/// <reference types="cypress" />

describe('Website Navigation', () => {
  it('should navigate to the Faculty page from the homepage', () => {
    // Visit the homepage
    cy.visit('/');

    // Find and click the "Faculty" link in the header
    cy.get('header nav a[href="/#/faculty"]').click();

    // Assert that the URL has changed correctly
    cy.url().should('include', '/#/faculty');

    // Assert that the main heading on the Faculty page is visible
    cy.get('h2').contains('Our Faculty').should('be.visible');
  });
});