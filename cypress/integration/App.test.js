const USERNAME = 'admin@admin.com';
const PASSWORD = 'admin';

it('should load the page', () => {
  cy.visit('/');
  cy.findAllByText(/Barcelona/i).should('have.length', 2);
});

it('logs in', function () {
  cy.visit('/login');
  
  // Limpio formulario (esto es solo porque tengo cargado manualmente datos)
  cy.get('input[name=email]').focus().clear();
  cy.get('input[name=password]').focus().clear();

  cy.get('input[name=email]').type(USERNAME);
  cy.get('input[name=password]').type(PASSWORD);
  cy.get('button[name=login]').click();

  cy.url().should('include', '/mesas');
});