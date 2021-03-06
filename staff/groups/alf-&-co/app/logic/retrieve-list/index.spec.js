{ 
    const { random }= Math
    
    describe('logic - retrieve custom lists', () => {
        let user
        let movieId = '680'
        let listName = 'Best of 2019'

        beforeEach(() => {

            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: [],
                lists: [{name: listName, movies: [movieId]}]
            }

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                })
                .then(() => {
                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)
                                data = response.data
                        })
                })
            })

        it('should succeed on correct data', () => {
            return logic.retrieveLists(data.id, data.token, movieId)
                .then(lists => {

                    /* We need to retrieve user to check list was added to users' lists */
                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined)
                        .then(response => {
                            const retrievedUser = response.data
                            expect(retrievedUser.id).toBe(data.id)
                            expect(retrievedUser.lists instanceof Array).toBeTruthy()
                            expect(retrievedUser.lists.length).toBe(1)
                            expect(retrievedUser.lists[0].name).toBe('Best of 2019')
                            expect(retrievedUser.lists[0].movies).toBeDefined()
                            expect(retrievedUser.lists[0].movies[0]).toBe('680')

                        })
                    })
            })
        

        /* Undefined */
        it('should fail when userId is not provided', () => {
            expect(() => logic.retrieveLists(undefined, data.token, movieId)).toThrowError('id with value undefined is not a string')
        })

        it('should fail when userToken is not provided', () => {
            expect(() => logic.retrieveLists(data.id, undefined, movieId)).toThrowError('token with value undefined is not a string')
        })

        it('should fail when listName is not provided', () => {
            expect(() => logic.retrieveLists(data.id, data.token, undefined)).toThrowError('movie id with value undefined is not a string')
        })

        /* Wrong credentials */
        it('should fail on incorrect userId', () => {
            return logic.retrieveLists('aaaaa', data.token, movieId)
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail on incorrect userToken', () => {
            return logic.retrieveLists(data.id, 'bbbbb', movieId)
                .catch(error => expect(error).toBeDefined())
        })

        
        /* Empty parameters */
        it('should fail when userId is not provided', () => {
            expect(() => logic.retrieveLists('', data.token, movieId)).toThrowError('id is empty or blank')
        })

        it('should fail when userToken is not provided', () => {
            expect(() => logic.retrieveLists(data.id, '', movieId)).toThrowError('token is empty or blank')
        })

        it('should fail when listName is not provided', () => {
            expect(() => logic.retrieveLists(data.id, data.token, '')).toThrowError('movie id is empty or blank')
        }) 

        /* Wrong endpoints */
        it('should fail on incorrect user api endpoint', () => {
            return logic.retrieveLists(data.id, data.id, movieId)
                .catch(error => expect(error).toBeDefined())
        })


        it('should fail on incorrect tmdb api endpoint', () => {
            return logic.retrieveLists(data.id, data.id, movieId)
                .catch(error => expect(error).toBeDefined())
        })


        describe('when user does not have custom lists', () => {
          let user

          beforeEach(() => {

              user = {
                  name: 'John-' + random(),
                  surname: 'Doe-' + random(),
                  username: 'johndoe-' + random() + '@mail.com',
                  password: '123-' + random(),
                  favorites: [],
                  lists: []
              }

              return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                  .then(response => {
                      if (response.status === 'KO') throw new Error(response.error)
                  })
                  .then(() => {
                      return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                  })
                  .then(response => {
                      if (response.status === 'KO') throw new Error(response.error)
                      data = response.data
                  })
            })


            it('should succeed on correct data', () => {
                return logic.retrieveLists(data.id, data.token, movieId)
                    .then(lists => {

                    /* We need to retrieve user to check list was added to users' lists */
                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined)
                        .then(response => {
                            const retrievedUser = response.data
                            expect(retrievedUser.id).toBe(data.id)
                            expect(retrievedUser.lists instanceof Array).toBeTruthy()
                            expect(retrievedUser.lists.length).toBe(0)

                        })
                    })
                })
        })
    })
}