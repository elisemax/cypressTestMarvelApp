/// <reference types="cypress"/>
import {buttons} from '../fixtures/buttons.json'
describe('TestTest links', () => {
    it('Test buttons with links', () => {
        cy.visit('https://marveltest35.herokuapp.com/')
         buttons.forEach( buttonsId=>{
            cy.testLink(buttonsId);
         })
    })
})