const literals = require('./i18n')
const { path, goBackPath } = require('./config')

function Register(lang) {
    const { signUp, name, surname, password, repassword, goBack } = literals[lang]

    return `<h1>${signUp}</h1>
        <form method="post" action="${path}">
            <label>${name}<input type="text" name="name" /></label>
            <label>${surname}<input type="text" name="surname" /></label>
            <label>E-mail<input type="email" name="email" /></label>
            <label>${password}<input type="password" name="password" /></label>
            <label>${repassword}<input type="password" name="repassword" /></label>
            <button>${signUp}</button>
        </form>
        <a href="${goBackPath}">${goBack}</a>`
}

module.exports = Register