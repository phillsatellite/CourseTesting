describe(`Test logout`, () => {
    beforeEach (`login to application`, () => {
        cy.LoginToApplication()
    })

    it(`verify user can logout`, () =>{
        cy.contains(`Settings`).click()
        cy.contains(`Or click here to logout`).click()
        cy.get(`.navbar-nav`).should(`contain`, `Sign up`)
    })
})
