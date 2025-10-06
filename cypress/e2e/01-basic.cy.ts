// Test cơ bản - Các test case cho homepage và navigation
describe('Angular App Basics', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage', () => {
    cy.title().should('eq', 'FirstNgApp');
    cy.get('app-root').should('exist');
  });

  it('should display header with correct title', () => {
    cy.get('header').should('be.visible');
    cy.get('header span').should('contain', 'My First Angular App');
  });

  it('should navigate to todos page', () => {
    cy.get('nav ul li[routerLink="/todos"]').click();
    cy.url().should('include', '/todos');
    cy.get('h3').should('contain', 'Todos List');
  });

  it('should navigate back to home', () => {
    cy.get('nav span[routerLink="/"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});