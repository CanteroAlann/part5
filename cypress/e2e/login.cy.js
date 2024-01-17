describe('testing login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  }
  )


  it('title is correct', function () {
    cy.contains('Log in to application')

  }
  )
  it('login fails with wrong password', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
  })

  it('login a valid user works', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    it('a blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created to be liked')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('a blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created to be deleted')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('a blog created to be deleted').should('not.exist')
    })

    it('only the creator can delete a blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created to be deleted')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('logout').click()
      const user = {
        name: 'juan',
        username: 'juanDev',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:5173')
      cy.get('#username').type('juanDev')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('a blog created to be deleted')
    })
  })
})

