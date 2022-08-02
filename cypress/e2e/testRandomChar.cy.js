/// <reference types="cypress"/>
describe('Test get random char', () => {
  it('Test random char', () => {
    cy.visit('https://marveltest35.herokuapp.com/')
    cy.wait(3000)
    cy.intercept('GET','**/characters/**').as("characters")
    cy.get('[data-cy="randomchar__static__id"]').click()
    cy.wait('@characters')
    let randomCharacter;
    cy.get('@characters').then( req=>{
       expect(req.response.body.code).to.equal(200)
       randomCharacter = req.response.body.data.results[0].id;
    })
    cy.get('[data-cy="randomchar__static__id"]').click()
    cy.wait('@characters')
    cy.get('@characters').then( req=>{
      expect(req.response.body.code).to.equal(200)
      expect(req.response.body.data.results[0].id).not.equal(randomCharacter)
   })
  })
})