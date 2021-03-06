const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../.')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://172.17.0.2', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return client.connect()
            .then(() => {
                const db = client.db('skylab')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('register', () => {
        let name, surname, email, password, repassword

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            repassword = password
        })

        it('should succeed on correct data', () =>
            logic.registerUser(name, surname, email, password, repassword)
                .then((response) => {

                    expect(response).to.not.exist
                    return users.findOne({ name })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )

        // it('should cry if user exists')
    })


    after(() => client.close())
})