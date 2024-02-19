describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Shaiharyaar Ahmad',
      username: 'Sherry123',
      password: 'suomea',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username-id').type('Sherry123')
      cy.get('#password-id').type('suomea')
      cy.get('#login-btn-id').click()
      cy.contains('Shaiharyaar Ahmad logged in')
    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username-id').type('Sherry')
      cy.get('#password-id').type('incorrect')
      cy.get('#login-btn-id').click()
      cy.contains('Wrong credentials')
      cy.contains('Shaiharyaar Ahmad logged in').should('not.exist')
      cy.get('#notification-id').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({
        name: 'Shaiharyaar Ahmad',
        username: 'Sherry123',
        password: 'suomea',
      })
    })

    it('new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#blog-title-id').type('My new blog')
      cy.get('#blog-author-id').type('Shaiharyaar')
      cy.get('#blog-url-id').type('www.shaiharyaar.vercel.app')
      cy.get('#blog-submit-btn-id').click()
      cy.contains('a new blog My new blog by Shaiharyaar added')
      cy.contains('My new blog Shaiharyaar').contains('view').click()
      cy.contains('www.shaiharyaar.vercel.app')
      cy.contains('likes 0')
      cy.contains('Shaiharyaar Ahmad')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'New blog', author: 'Shaiharyaar', url: 'some link to the blog' })
      })
      it('a blog can be liked', function () {
        cy.contains('New blog Shaiharyaar')
          .contains('view')
          .click()
          .then(function () {
            cy.contains('likes 0')
            cy.contains('likes 0').contains('like')
            cy.get('#like-btn-id').click()
            cy.contains('likes 1')
          })
      })
    })

    describe('blog can only be deleted by owner', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'New blog', author: 'Shaiharyaar', url: 'some link to the blog' })
      })
      it('delete success by its creator', function () {
        const blog = { title: 'New blog', author: 'Uzair', url: 'some link to the blog' }
        cy.createBlog(blog)

        const stub = cy.stub()
        cy.on('window:alert', stub)
        cy.contains('New blog Shaiharyaar').contains('view').click()
        cy.get('#blog-remove-id').click()
        cy.on('window:alert', (txt) => {
          expect(txt).to.contains(`Remove blog ${blog.title} by ${blog.author}`)
        })
      })

      it('delete button not visible for others', function () {
        cy.get('#logout-btn-id').click()
        const user = {
          name: 'Ahmad uzair',
          username: 'Uzair123',
          password: 'suomea',
        }
        const blog = { title: 'New blog', author: 'Uzair', url: 'some link to the blog' }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.login({
          username: 'Uzair123',
          password: 'suomea',
        })
        cy.createBlog(blog)

        cy.contains('New blog Shaiharyaar').contains('view').click()
        cy.contains('Shaiharyaar Ahmad')
        cy.contains('remove').should('not.be.visible')
      })
    })

    describe('multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog with least likes',
          author: 'Shaiharyaar',
          url: 'link',
          likes: 0,
        })
        cy.createBlog({
          title: 'blog with second most likes',
          author: 'Shaiharyaar',
          url: 'link',
          likes: 10,
        })
        cy.createBlog({
          title: 'blog with second least likes',
          author: 'Shaiharyaar',
          url: 'link',
          likes: 4,
        })
        cy.createBlog({
          title: 'blog with third least likes',
          author: 'Shaiharyaar',
          url: 'link',
          likes: 8,
        })
        cy.wait(300)
      })
      it('blogs are ordered by likes', function () {
        cy.get('.blog').eq(0).contains('blog with second most likes')
        cy.get('.blog').eq(1).contains('blog with third least likes')
        cy.get('.blog').eq(2).contains('blog with second least likes')
        cy.get('.blog').eq(3).contains('blog with least likes')
      })
    })
  })
})
