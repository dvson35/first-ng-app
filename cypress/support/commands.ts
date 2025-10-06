/// <reference types="cypress" />
// Custom Commands cho Angular Todo App
// ***********************************************

// Ví dụ 1: Command để đợi todos load xong
Cypress.Commands.add('waitForTodosToLoad', () => {
  cy.get('app-todo-item').should('exist');
  cy.get('p').contains('Loading...').should('not.exist');
});

// Ví dụ 2: Command để navigate và verify  
Cypress.Commands.add('navigateToTodos', () => {
  cy.get('nav ul li[routerLink="/todos"]').click();
  cy.url().should('include', '/todos');
  cy.get('h3').should('contain', 'Todos List');
});

// Ví dụ 3: Command để search todos
Cypress.Commands.add('searchTodos', (searchTerm) => {
  cy.get('input[name="searchTerm"]').clear().type(searchTerm);
  cy.wait(500); // Wait for filter to apply
});

// Ví dụ 4: Command để mock todos API
Cypress.Commands.add('mockTodosAPI', (todos = []) => {
  const defaultTodos = [
    { id: 1, title: 'Test Todo 1', completed: false, userId: 1 },
    { id: 2, title: 'Test Todo 2', completed: true, userId: 1 }
  ];
  
  cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos', {
    statusCode: 200,
    body: todos.length > 0 ? todos : defaultTodos
  }).as('getTodos');
});

// Ví dụ 5: Command để check responsive breakpoints
Cypress.Commands.add('checkResponsive', (breakpoint) => {
  const viewports = {
    mobile: [375, 667],
    tablet: [768, 1024], 
    desktop: [1440, 900]
  };
  
  const [width, height] = viewports[breakpoint];
  cy.viewport(width, height);
});
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }