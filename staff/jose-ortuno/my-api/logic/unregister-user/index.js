const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports =
    /**
     * Unregister user
     * Delete a user through the ID
     * 
     * @param {string} id: User id
     * @param {password} password: User password
     * @return {string} Error message: in case that user not exist os is not find
     * @return {number} deletedCount: in case that user not exist os is not find (range max 1)
     * 
     */
    function (id, password) {
        validate.string(id, 'id')
        validate.string(password, 'password')

        return this.__users__.deleteOne({ _id: ObjectId(id) }, password)
            .then(({ deletedCount }) => {
                if (!deletedCount) throw Error('User does not exist or is not find')

            }).then(() => { })
    }