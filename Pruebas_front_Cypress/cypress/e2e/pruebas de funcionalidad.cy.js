describe('template spec', () => {
  beforeEach('carga la pagina', () => {
    cy.visit('https://covidtracking.com/')
  })
  it('verificador de contenido inicial', () => {
    cy.get('._28427 > img').should('be.visible')
    cy.get('._1d7b2 > :nth-child(1) > h3').should('contain', 'Federal COVID Data').should('be.visible')
    cy.get('._1d7b2 > :nth-child(2) > h3').should('contain','How We Made The COVID Tracking Project').should('be.visible')
    cy.get(':nth-child(3) > h3').should('contain', 'Nursing Homes & Long-Term-Care Data').should('be.visible')
    cy.get(':nth-child(4) > h3').should('contain', 'Race & COVID').should('be.visible')
    cy.get(':nth-child(5) > h3').should('contain', 'Vaccination Data').should('be.visible')
    cy.get(':nth-child(6) > h3').should('contain','All Our Analysis & Updates').should('be.visible')
    cy.get('[href="/thank-you#rick-palmer"]').click().then(() => {
      cy.url().should('eq','https://covidtracking.com/thank-you#rick-palmer')
    })

  })
})