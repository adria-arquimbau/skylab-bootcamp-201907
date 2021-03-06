/**
     * Authenticates a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise}
     */
    module.exports = function (email, password) {
        // TODO validate fields

        return this.__users__.findOne({ email })
            .then(user => {
                if (!user) throw new Error(`user with e-mail ${email} does not exist`)

                if (user.password !== password) throw new Error('wrong credentials')

                return user._id.toString()
            })
    }
