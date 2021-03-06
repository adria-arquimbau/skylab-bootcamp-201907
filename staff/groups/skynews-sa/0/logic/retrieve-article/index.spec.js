{
  const { random } = Math

  describe('logic - retrieve article', () => {
    let user
    const article = {
      author: null,
      content: "Rolls-Royce is warning of a further £100 million loss on the Trent 1000 engine programme for the Boeing 787 Dreamliner as the troublesome jet turbine that has grounded hundreds of aircraft continues to weigh on the engineering giant,↵The UK aerospace champio… [+471 chars]",
      description: "Rolls-Royce is warning of a further £100 million loss on the Trent 1000 engine programme for the Boeing 787 Dreamliner as the troublesome jet turbine that has grounded hundreds of aircraft...",
      publishedAt: "2019-08-06T11:00:00Z",
      source: { id: null, name: "Thetimes.co.uk" },
      title: "Rolls-Royce warns of further engine trouble | Business - The Times",
      url: "https://www.thetimes.co.uk/article/rolls-royce-warns-of-further-engine-trouble-llxzbtn6l",
      urlToImage: "http://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe570fb7e-b836-11e9-9ed1-57176c9fe03e.jpg?crop=2794%2C1572%2C0%2C146&resize=685",
      favorite: true

    }
    beforeEach(() => {
      user = {
        name: 'John-' + random(),
        surname: 'Doe-' + random(),
        username: 'johndoe-' + random() + '@mail.com',
        password: '123-' + random(),
        favorites: []
      }

      user.favorites.push(article)


      return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
        .then(response => {
          if (response.status === 'KO') throw new Error(response.error)

          return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
            .then(response => {
              if (response.status === 'KO') throw new Error(response.error)

             credentials = response.data
            })
        })
    })
    it('article defined', () => {
      const id1=undefined, token1=undefined
      const article1 = logic.retrieveArticle(id1, token1, article)
      expect(article1).toBeDefined()
      expect(article1.url).toBeDefined()
      expect(article1.title).toBeDefined()
      expect(article1.content).toBeDefined()
    })
    
      it('article defined register', () => {
        debugger
      logic.retrieveArticle(credentials.id, credentials.token, article)
        expect(article).toBeDefined()
        expect(article.url).toBeDefined()
        expect(article.title).toBeDefined()
        expect(article.content).toBeDefined()
      })
  })
}