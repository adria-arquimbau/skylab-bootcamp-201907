const literals = require('./i18n')
const { path, goBackPath } = require('./config')

// module.exports = function (lang) {
module.exports = function (lang, res, error) {
    const { signIn, goBack, password, } = literals[lang]

    //     return `<h1>${signIn}</h1>
    //         <form method="post" action="${path}">
    //             <label>E-mail<input type="email" name="email" /></label>
    //             <label>${password}<input type="password" name="password" /></label>
    //             <button>${signIn}</button>
    //         </form>
    //         <a href="${goBackPath}">${goBack}</a>`

    res.render('login', { signIn, goBack, password, path, goBackPath, error })
}