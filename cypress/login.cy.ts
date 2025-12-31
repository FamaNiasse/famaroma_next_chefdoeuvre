describe('Login Component', () => {
    beforeEach(() => {
      cy.visit('/login'); 
    });
  
    it('renders the login form', () => {
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    it('shows error message on failed login', () => {
      cy.intercept('POST', 'http://localhost:8081/users/login', {
        statusCode: 400,
        body: { message: 'Login failed' },
      }).as('loginRequest');
  
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@loginRequest');
      cy.contains('Login failed').should('be.visible');
    });
  
    it('redirects to admin dashboard on successful admin login', () => {
      const token = 'fake-token';
      const userResponse = { role: 1 };
  
      cy.intercept('POST', 'http://localhost:8081/users/login', {
        statusCode: 200,
        body: { token },
      }).as('loginRequest');
  
      cy.intercept('GET', 'http://localhost:8081/users/me', {
        statusCode: 200,
        body: userResponse,
      }).as('userRequest');
  
      cy.get('input[name="email"]').type('admin@example.com');
      cy.get('input[name="password"]').type('adminpassword');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@loginRequest');
      cy.wait('@userRequest');
  
      cy.url().should('include', '/admin-dashboard');
    });
  
    it('redirects to user dashboard on successful user login', () => {
      const token = 'fake-token';
      const userResponse = { role: 0 };
  
      cy.intercept('POST', 'http://localhost:8081/users/login', {
        statusCode: 200,
        body: { token },
      }).as('loginRequest');
  
      cy.intercept('GET', 'http://localhost:8081/users/me', {
        statusCode: 200,
        body: userResponse,
      }).as('userRequest');
  
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('userpassword');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@loginRequest');
      cy.wait('@userRequest');
  
      cy.url().should('include', '/dashboard');
    });
  });
  