require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User } } = require('../../data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        retrieveUser(id)
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).not.to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).not.to.exist
            })
    )

    after(() => database.disconnect())
})