{
    const {
        random
    } = Math

    describe('logic - register user', () => {
        let user, data

        beforeEach(() =>
            user = {
                name: 'name-' + random(),
                surname: 'surname-' + random(),
                username: 'user-' + random() + '@yahoo.com',
                password: '123-' + random(),
                favorites: []
            }
        )

        it('should succeed on correct data', () =>
            logic.registerUser(user.name, user.surname, user.username, user.password, user.password)
            .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post', {
                'content-type': 'application/json'
            }, {
                username: user.username,
                password: user.password
            }))
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                else {
                    data = response.data

                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get', {
                        'authorization': `bearer ${data.token}`
                    }, undefined)
                }
            })
            .then(response => {
                const _user = response.data

                expect(_user.name).toBe(user.name)
                expect(_user.surname).toBe(user.surname)
                expect(_user.username).toBe(user.username)
                expect(_user.password).toBeUndefined()
                expect(_user.id).toBe(data.id)
                expect(_user.favorites).toBeDefined()
                expect(_user.favorites).toEqual(user.favorites)
            })
        )

        it('should fail on empty name', () =>
            expect(() =>
                logic.registerUser('', 'Garcés', 'jorge@gmail.com', '123', '123')
            ).toThrowError(Error, 'name is empty or blank')
        )

        it('should fail on non-valid username', () =>
            expect(() =>
                logic.registerUser('Jorge', 'Garcés', 'jorge#gmail.com', '123', '123')
            ).toThrowError(Error, 'username with value jorge#gmail.com is not a valid e-mail')
        )

        it('should fail on non-matching re-password', () =>
            expect(() =>
                logic.registerUser('Jorge', 'Garcés', 'jorge@gmail.com', '123', '456')
            ).toThrowError(Error, 'passwords do not match')
        )



        describe('when user already exists', () => {
            it('should fail on already existing username', () =>
                logic.registerUser(user.name, user.surname, user.username, user.password, user.password)
                .catch(error => expect(error).toBeUndefined())
                .then(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password))
                .catch(error => expect(error).toBeDefined())
            )
        })
    })
}