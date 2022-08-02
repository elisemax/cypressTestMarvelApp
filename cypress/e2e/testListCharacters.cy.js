/// <reference types="cypress"/>

describe('Test List characters', () => {
    beforeEach(()=>{
        cy.visit('https://marveltest35.herokuapp.com/')
    })
    it('Test list logic', () => {
         cy.intercept('GET','**/characters*').as("characters")
         cy.wait(2000)
         cy.loadMoreTest(9)
         cy.wait(2000)
         cy.wait('@characters')
         let countAllCharacters;
         let currentOffset;
         cy.get('@characters').then( req=>{
             expect(req.response.body.code).to.equal(200)
             countAllCharacters = req.response.body.data.total;
             currentOffset = req.response.body.data.offset+req.response.body.data.count;
          })
          cy.wait(2000)
          cy.intercept('GET','**/characters*').as("charactersNew")
          cy.loadMoreTest(18)
          cy.wait(2000)
          cy.wait('@charactersNew')
          cy.get('@charactersNew').then( req=>{
            expect(req.response.body.code).to.equal(200)
            expect(countAllCharacters-currentOffset).to.equal(req.response.body.data.count)
            currentOffset = req.response.body.data.offset+req.response.body.data.count;
          })
          cy.get('.button__long').should('have.css','display','none');
    })
    it('Test description character', () => {
        cy.get('.skeleton').should('be.visible')
        cy.get('.char__grid').children('.char__item').first().click()
        cy.get('.char__info').children('.char__comics-list').find('.char__comics-item').should('have.length.lessThan',11);
   })
   it.only('Animation character', () => {
    cy.get('.char__grid').children('.char__item').first().click()
    cy.get('.char__grid').children('.char__item').first().should('have.css','box-shadow','rgb(159, 0, 19) 0px 5px 20px 0px')
    cy.get('.char__grid').children('.char__item').first().should('have.css','transform' ,'matrix(1, 0, 0, 1, 0, -8)')
    cy.get('.char__grid').children('.char__item').last().click()
    cy.get('.char__grid').children('.char__item').last().should('have.css','box-shadow','rgb(159, 0, 19) 0px 5px 20px 0px')
    cy.get('.char__grid').children('.char__item').last().should('have.css','transform' ,'matrix(1, 0, 0, 1, 0, -8)')
    cy.get('.char__info').children('.char__comics-list').find('.char__comics-item').should('have.length.lessThan',11);
    cy.get('.char__grid').children('.char__item').first().should('not.have.css','box-shadow','rgb(159, 0, 19) 0px 5px 20px 0px')
    cy.get('.char__grid').children('.char__item').first().should('not.have.css','transform' ,'matrix(1, 0, 0, 1, 0, -8)')
    })
})