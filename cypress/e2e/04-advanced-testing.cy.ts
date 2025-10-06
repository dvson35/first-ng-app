/// <reference types="cypress" />

describe('Advanced Testing - Responsive & Accessibility', () => {
  
  describe('Responsive Design Tests', () => {
    const viewports = [
      { device: 'iphone-6', width: 375, height: 667 },
      { device: 'ipad-2', width: 768, height: 1024 },
      { device: 'macbook-15', width: 1440, height: 900 }
    ];

    viewports.forEach((viewport) => {
      it(`should work correctly on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
        
        // Test header visibility
        cy.get('header').should('be.visible');
        cy.get('nav').should('be.visible');
        
        // Test navigation on different screens
        cy.get('nav ul li[routerLink="/todos"]').click();
        cy.url().should('include', '/todos');
        
        cy.get('h3').should('contain', 'Todos List');
      });
    });
  });

  describe('Form Interaction Tests', () => {
    beforeEach(() => {
      cy.visit('/todos');
    });

    it('should test search form functionality', () => {
      // Wait for todos to load
      cy.get('app-todo-item').should('exist');
      
      // Test empty search
      cy.get('input[name="searchTerm"]').should('have.value', '');
      
      // Test typing in search
      cy.get('input[name="searchTerm"]').type('test search');
      cy.get('input[name="searchTerm"]').should('have.value', 'test search');
      
      // Test clearing search
      cy.get('input[name="searchTerm"]').clear();
      cy.get('input[name="searchTerm"]').should('have.value', '');
    });

    it('should test keyboard navigation', () => {
      // Test Tab navigation
      cy.get('input[name="searchTerm"]').focus();
      cy.focused().should('have.attr', 'name', 'searchTerm');
      
      // Test Enter key
      cy.get('input[name="searchTerm"]').type('test{enter}');
    });
  });

  describe('Visual Testing', () => {
    it('should check visual elements', () => {
      cy.visit('/');
      
      // Take screenshot for visual comparison
      cy.screenshot('homepage-full');
      
      // Check specific elements
      cy.get('header').should('be.visible');
      cy.get('main').should('be.visible');
      
      // Test dark/light theme if available
      // cy.get('[data-cy=theme-toggle]').click();
      // cy.screenshot('homepage-dark-theme');
    });

    it('should test todo item visual states', () => {
      cy.visit('/todos');
      cy.get('app-todo-item').should('exist');
      
      // Test hover state (if applicable)
      cy.get('app-todo-item').first().trigger('mouseover');
      
      // Take screenshot of todo items
      cy.screenshot('todos-list');
    });
  });

  describe('Performance Tests', () => {
    it('should load page within acceptable time', () => {
      const start = Date.now();
      
      cy.visit('/todos').then(() => {
        const loadTime = Date.now() - start;
        expect(loadTime).to.be.lessThan(3000); // 3 seconds max
      });
    });

    it('should handle multiple rapid clicks', () => {
      cy.visit('/');
      
      // Rapid navigation clicks
      for (let i = 0; i < 5; i++) {
        cy.get('nav ul li[routerLink="/todos"]').click();
        cy.get('nav span[routerLink="/"]').click();
      }
      
      // Should still be functional
      cy.get('app-counter').should('exist');
    });
  });
});