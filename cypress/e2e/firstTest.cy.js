describe(`Test with backend`, () => {

  beforeEach(`Login to application`, () => {
    cy.loginToApplication()
  })

  it(`first`, () => {
    cy.log(`Yay we logged in`)
  })
})