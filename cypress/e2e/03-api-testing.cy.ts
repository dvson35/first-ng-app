/// <reference types="cypress" />

describe('API Testing với Cypress', () => {
  
  it('should test real API endpoint', () => {
    // Test thực API call
    cy.request('GET', 'https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('completed');
        expect(response.body).to.have.property('userId');
      });
  });

  it('should mock API responses', () => {
    // Mock API response BEFORE visiting the page
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Test Todo 1', completed: false, userId: 1 },
        { id: 2, title: 'Test Todo 2', completed: true, userId: 1 }
      ]
    }).as('getMockedTodos');

    cy.visit('/todos');
    cy.wait('@getMockedTodos');

    // Wait a bit for Angular to render
    cy.wait(1000);

    // Verify mocked data is displayed - check if todos are loaded
    cy.get('app-todo-item').should('have.length', 2);
    
    // Check if the todo titles appear anywhere in the page
    cy.get('body').should('contain', 'Test Todo 1');
    cy.get('body').should('contain', 'Test Todo 2');
  });

  it('should handle API error gracefully', () => {
    // Mock API error
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
      statusCode: 500,
      body: { error: 'Server Error' }
    }).as('getErrorTodos');

    cy.visit('/todos');
    cy.wait('@getErrorTodos');

    // Verify error handling (adjust based on your error handling)
    cy.get('p').contains('Loading...').should('be.visible');
  });

  it('should test slow API response', () => {
    // Mock slow API response BEFORE visiting
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
      delay: 1000, // 1 second delay
      statusCode: 200,
      body: [{ id: 1, title: 'Slow Todo', completed: false, userId: 1 }]
    }).as('getSlowTodos');

    cy.visit('/todos');
    
    // Should show loading state initially
    cy.get('body').should('contain', 'Loading...');
    
    cy.wait('@getSlowTodos');
    
    // Wait for rendering
    cy.wait(500);
    
    // Should eventually show todos
    cy.get('app-todo-item').should('have.length', 1);
    cy.get('body').should('contain', 'Slow Todo');
  });
});