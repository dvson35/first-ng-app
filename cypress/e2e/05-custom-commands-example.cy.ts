/// <reference types="cypress" />

describe('Test Example using Custom Commands', () => {
  
  it('should use custom commands - Basic Flow', () => {
    // Mock API manually instead of using custom command for now
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Test Todo 1', completed: false, userId: 1 },
        { id: 2, title: 'Test Todo 2', completed: true, userId: 1 }
      ]
    }).as('getTodos');
    
    // Navigate to todos page manually
    cy.visit('/');
    cy.get('nav ul li[routerLink="/todos"]').click();
    cy.url().should('include', '/todos');
    
    // Wait for todos to load
    cy.wait('@getTodos');
    cy.get('app-todo-item').should('exist');
    
    // Search todos
    cy.get('input[name="searchTerm"]').type('Test Todo 1');
    cy.get('body').should('contain', 'Test Todo 1');
  });

  it('should test responsive design', () => {
    cy.visit('/');
    
    // Test mobile view manually
    cy.viewport(375, 667);
    cy.get('header').should('be.visible');
    
    // Test desktop view manually
    cy.viewport(1440, 900);
    cy.get('nav ul li').should('be.visible');
  });
});