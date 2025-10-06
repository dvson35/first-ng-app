// Import types nếu cần
/// <reference types="cypress" />

describe('Todo App Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/todos');
  });

  it('should load todos from API', () => {
    // Intercept API call để test
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', { fixture: 'todos.json' }).as('getTodos');
    cy.visit('/todos');
    cy.wait('@getTodos');
    
    cy.get('h3').should('contain', 'Todos List');
    cy.get('app-todo-item').should('have.length.greaterThan', 0);
  });

  it('should filter todos by search term', () => {
    // Wait for todos to load
    cy.get('app-todo-item').should('exist');
    
    // Test search functionality
    cy.get('input[name="searchTerm"]').type('delectus');
    cy.get('app-todo-item').should('have.length.lessThan', 10);
    
    // Clear search
    cy.get('input[name="searchTerm"]').clear();
    cy.get('app-todo-item').should('have.length.greaterThan', 10);
  });

  it('should toggle todo completion status', () => {
    // Wait for todos to load
    cy.get('app-todo-item').should('exist');
    
    // Click first todo item to toggle
    cy.get('app-todo-item').first().click();
    
    // Verify visual changes (based on HighlightCompletedTodo directive)
    // Note: You might need to adjust selectors based on your actual HTML structure
  });

  it('should show loading state initially', () => {
    // Mock a slower API to catch loading state
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
      delay: 500,
      statusCode: 200,
      fixture: 'todos.json'
    }).as('getSlowTodos');
    
    cy.visit('/todos');
    
    // Should show loading message before todos load
    cy.get('body').should('contain', 'Loading...');
    
    // Wait for API call to complete
    cy.wait('@getSlowTodos');
    
    // Wait for todos to load and loading message to disappear
    cy.get('app-todo-item').should('exist');
    cy.get('body').should('not.contain', 'Loading...');
  });
});