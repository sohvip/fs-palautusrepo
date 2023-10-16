describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'GENGAR',
      username: 'gengar',
      password: 'pokemon'
    }
    const user_2 = {
      name: 'NINETALES',
      username: 'ninetales',
      password: 'kanto'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user_2)
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('gengar')
      cy.get('#password').type('pokemon')
      cy.get('#login-button').click()
      cy.contains('GENGAR logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('umbreon')
      cy.get('#password').type('shiny')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('gengar')
      cy.get('#password').type('pokemon')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Violet')
      cy.get('#author').type('Blogger')
      cy.get('#url').type('https://pokemonblog.com/tag/violet/')
      cy.get('#create-button').click()
      cy.contains('a new blog Violet by Blogger added')
      cy.contains('Violet')
    })
  })

  describe('blog', function() {
    beforeEach(function() {
      cy.get('#username').type('gengar')
      cy.get('#password').type('pokemon')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('Violet')
      cy.get('#author').type('Blogger')
      cy.get('#url').type('https://pokemonblog.com/tag/violet/')
      cy.get('#create-button').click()
      cy.reload()
    })

    it('can be liked', function() {
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('can be deleted by owner', function() {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('body').should('not.contain', 'Violet')
    })

    it('cannot be deleted by others', function() {
      cy.get('#logout-button').click()
      cy.get('#username').type('ninetales')
      cy.get('#password').type('kanto')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.get('body').should('not.contain', 'delete')
    })
  })

  describe('blogs', function() {
    beforeEach(function() {
      cy.login({
        'username': 'gengar',
        'password': 'pokemon'
      })
      cy.createBlog({
        'title': 'Hyrule Blog',
        'author': 'Tourian Tourist',
        'url': 'https://touriantourist.blogspot.com/',
        'likes': 2
      })
      cy.createBlog({
        'title': 'Violet',
        'author': 'Blogger',
        'url': 'https://pokemonblog.com/tag/violet/',
        'likes': 1
      })
      cy.createBlog({
        'title': 'Ghibli Blog',
        'author': 'Daniel Thomas MacInnes',
        'url': 'https://ghiblicon.blogspot.com/',
        'likes': 0
      })
    })

    it('are displayed in order considering likes', function() {
      cy.get('.blog').eq(0).should('contain', 'Hyrule Blog')
      cy.get('.blog').eq(1).should('contain', 'Violet')
      cy.get('.blog').eq(2).should('contain', 'Ghibli Blog')
    })
  })
})
