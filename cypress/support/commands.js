// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('testLink', subject => {
    cy.intercept('GET','**/settings/**').as("settings")
    cy.get(`${subject}`).click()
    cy.wait('@settings')
    cy.get('@settings').then( req=>{
        expect(req.response.body.code).to.equal(200)
     })
     
 })
 Cypress.Commands.add('loadMoreTest', length => {
    cy.get('.char__grid').children('.char__item').should('have.length',length)
    cy.contains('load more').scrollIntoView().should('be.visible')
    cy.contains('load more').click()
 })