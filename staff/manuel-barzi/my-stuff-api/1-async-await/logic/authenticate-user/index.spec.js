const { expect } = require('chai')
const logic = require('..')
const { database, models: { User } } = require('../../data')

describe('logic - authenticate user', () => {
    before(() => database.connect('mongodb://localhost/my-api-test'))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.authenticateUser(email, password)
        
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })

    after(() => database.disconnect())
})