describe('Component Testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display greeting component', () => {
    cy.get('app-greeting').should('exist');
  });

  it('should test counter component interactions', () => {
    // Test counter initial value
    cy.get('app-counter').should('exist');
    cy.get('app-counter p').should('contain', 'Counter value: 0');
    
    // Test increment button
    cy.get('app-counter button').contains('Increment').click();
    cy.get('app-counter p').should('contain', 'Counter value: 1');
    
    // Test increment again
    cy.get('app-counter button').contains('Increment').click();
    cy.get('app-counter p').should('contain', 'Counter value: 2');
    
    // Test decrement button
    cy.get('app-counter button').contains('Decrement').click();
    cy.get('app-counter p').should('contain', 'Counter value: 1');
    
    // Test reset button
    cy.get('app-counter button').contains('Reset').click();
    cy.get('app-counter p').should('contain', 'Counter value: 0');
  });

  it('should test input field functionality', () => {
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="text"]').type('Hello Cypress!');
    cy.get('input[type="text"]').should('have.value', 'Hello Cypress!');
  });
});