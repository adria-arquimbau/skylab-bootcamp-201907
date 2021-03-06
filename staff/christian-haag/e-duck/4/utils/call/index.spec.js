describe('call', () => {
    describe('post', () => {
        it('should succeed on coherent data', done => {
            call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, {
                username: `pepito-${Math.random()}`,
                password: 'grillo'
            }, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeDefined()

                done()
            })
        })
    })

    describe('get', () => {
        it('should succeed on coherent data', done => {
            call('https://duckling-api.herokuapp.com/api/search?q=green', 'get', undefined, undefined, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeDefined()

                done()
            })
        })
    })

    describe('put', () => {
        it('should succeed on coherent data', done => {
            call('https://reqres.in/api/users/2', 'put', undefined, {
                "name": "morpheus",
                "job": "zion resident"
            }, (error, response) => {
                expect(error).toBeUndefined()
                expect(response).toBeDefined()

                done()
            })
        })
    })

    describe('delete', () => {
        it('schould suceed on coherent data delete', done => {
            call('https://requres.in/api/users/2/data', 'delete', undefined, { "id": 4 }, (error, response) => {
                expect(error).toBeDefined()
                expect(response).toBeUndefined()

                done()
            })
        })
    })
})