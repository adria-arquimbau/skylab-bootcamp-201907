const { validate, call } = require('../../utils')

module.exports = function(id, token, query) {
    let favorites

    if (id != undefined && token != undefined) {
         validate.multiple([
            { type: 'string', name: 'id' , target: id },
            { type: 'string', name: 'token', target: token },
            { type: 'string', name: 'query', target: query, empty: false }
        ])

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`http://duckling-api.herokuapp.com/api/search?q=${query}`, 'get', undefined, undefined)
                    .then(ducks => {
                        if (ducks.error) return []
                        else {
                            favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

                            return ducks
                        }
                    })
            })
    } else {
         validate.multiple([
            { type: 'string', name: 'query' , target: query, empty: false }
        ])

        return call(`http://duckling-api.herokuapp.com/api/search?q=${query}`, 'get', undefined, undefined)
            .then(ducks => {
                if (ducks.error) return []

                favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

                return ducks
            })
    }
}