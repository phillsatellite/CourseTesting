describe(`Test with backend`, () => {

  beforeEach(`Login to application`, () => {
    cy.intercept(`GET`, `https://conduit-api.bondaracademy.com/api/tags`, {fixture: `tags.json`})
    cy.loginToApplication()
  })

  it(`verify request and response are correct`, () => {
    
    cy.intercept(`POST`, `https://conduit-api.bondaracademy.com/api/articles`).as(`postArticles`)
    
    cy.contains(`New Article`).click()
    cy.get(`[formcontrolname="title"]`).type("New article test")
    cy.get(`[formcontrolname="description"]`).type("This is a description")
    cy.get(`[formcontrolname="body"]`).type("My article is a test")
    cy.contains(`Publish Article`).click()
  
    cy.wait(`@postArticles`).then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.body).to.equal(`My article is a test`)
      expect(xhr.response.body.article.description).to.equal(`This is a description`)
    })

  it.only(`verify popular text is displayed`, () => {
      cy.log(`we logged in`)
    })

  })
})