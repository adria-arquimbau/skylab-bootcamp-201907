const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('register', () => {
        let name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
        })

        it('should succeed on correct data', () =>
            logic.registerUser(name, surname, email, password)
                .then(result => {
                    expect(result).not.to.exist

                    return users.findOne({ email })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )
    })

    describe('authenticate', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.authenticateUser(email, password)
                .then(_id => {
                    expect(_id).to.exist
                    expect(_id).to.be.a('string')
                    expect(_id).to.equal(id)
                })
        )
    })

    describe('retrieve user', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.retrieveUser(id)
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
    })

    describe('update user', () => {
        let name, surname, email, password, id

        before(() => {
            client = new MongoClient('mongodb://localhost')

            return client.connect()
                .then(() => {
                    const db = client.db('skylab')

                    users = db.collection('users')

                    logic.__users__ = users
                })
        })

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password})
                .then(result => id= result.insertedId.toString())
        })

        it('Should succeed on correct update user', () => {
        
            let _name, _surname, _password
    
            _name = `neWname-${Math.random()}`
            _surname = `neWsurname-${Math.random()}`
            _password = `neWpassword-${Math.random()}`
    
            logic.updateUser(email, _name, _surname, _password)
                .then(() => {
                    users.findOne({ email }, { projection: { _id: 0 }})
                        .then(user =>{
                            expect(user).to.exist
                            expect(user.name).to.equal(_name)
                            expect(user.surname).to.equal(_surname)
                            expect(user.password).to.equal(_password)
                        })
    
    
                })
    
    
        })
    })



    describe('unregister user', () => {
        // TODO
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password})
                .then(result => id= result.insertedId.toString())
        })

        it('Should succeed on correct update user', () => {
        
            let _name, _surname, _password
    
            _name = `neWname-${Math.random()}`
            _surname = `neWsurname-${Math.random()}`
            _password = `neWpassword-${Math.random()}`
    
            logic.updateUser(email, _name, _surname, _password)
                .then(() => {
                    users.findOne({ email }, { projection: { _id: 0 }})
                        .then(user =>{
                            expect(user).to.exist
                            expect(user.name).to.equal(_name)
                            expect(user.surname).to.equal(_surname)
                            expect(user.password).to.equal(_password)
                        })
    
    
                })
    
    
        })
    })

    after(() => client.close())
})