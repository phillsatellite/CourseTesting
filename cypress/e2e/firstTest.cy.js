describe(`Test with backend`, () => {

  beforeEach(`Login to application`, () => {
    cy.intercept({method:`Get`, path:`tags`}, {fixture: `tags.json`})
    cy.loginToApplication()
  })

  it(`verify request and response are correct`, () => {
    
    const titleText = "New article test"
    const descripText = "This is a description"
    const bodyText = "My article is a test"

    cy.intercept(`POST`, `**/articles`).as(`postArticles`)

    cy.contains(`New Article`).click()
    cy.get(`[formcontrolname="title"]`).type(titleText)
    cy.get(`[formcontrolname="description"]`).type(descripText)
    cy.get(`[formcontrolname="body"]`).type(bodyText)
    cy.contains(`Publish Article`).click()
  
    cy.wait(`@postArticles`).then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.request.body.article.body).to.equal(`My article is a test`)
      expect(xhr.response.body.article.description).to.equal(`This is a description`)
    })
  })

  it(`verify popular text is displayed`, () => {
      cy.get('.tag-list')
      .should(`contain`, `Cypress`)
      .and(`contain`, `Automation`)
      .and(`contain`, `Testing`)
    })

    it(`verify global feed likes count`, () => {
      cy.intercept(`GET`, `https://conduit-api.bondaracademy.com/api/articles/feed*`, {"articles":[],"articlesCount":0})
      cy.intercept(`GET`, `https://conduit-api.bondaracademy.com/api/articles*`, {fixture: `articles.json`})

      cy.contains(`Global Feed`).click()
      cy.get(`app-article-list button`)
      cy.get(`app-article-list button`).eq(0).should(`contain`, `1`)
      cy.get(`app-article-list button`).eq(1).should(`contain`, `603`)

    cy.fixture(`articles`).then(file => {
      const articleLink = file.articles[1].slug
      file.articles[1].favoritesCount = 603
      cy.intercept(`POST`, `https://conduit-api.bondaracademy.com/api/articles/`+articleLink+`/favorite`, file)
    })

    cy.get(`app-article-list button`).eq(1).click().should(`contain`, `603`)
  })
})
