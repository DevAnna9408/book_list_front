Cypress.Commands.add('login', (userId, password) => {
  cy.visit('/')
    .contains('로그인')
    .click()

  cy.get('input[name=userId]')
    .type(userId)
    .get('input[name=password]')
    .type(password)

  cy.get('button').contains('로그인').click()
})
