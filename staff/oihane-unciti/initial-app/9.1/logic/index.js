'use strict';

/**
 * Business Logic
 */

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var logic = {
    register: function (name, surname, email, password) {
        var errors = '';

        if (!name.trim()) {
            errors += 'Name is empty or blank.';
        }

        if (!surname.trim()) {
            if (errors) errors += '\n';

            errors += 'Surname is empty or blank.';
        }

        if (!email.trim()) {
            if (errors) errors += '\n';

            errors += 'E-mail is empty or blank.';
        } else if (!EMAIL_REGEX.test(email)) {
            if (errors) errors += '\n';

            errors += 'E-mail is not valid.';
        }

        if (!password.trim()) {
            if (errors) errors += '\n';

            errors += 'Password is empty or blank.\n';
        }

        if (errors)
            throw new Error(errors);
        else {
            var user = users.find(function (user) {
                return user.email === email;
            });

            if (user) throw new Error('E-mail is already registered.');

            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        }
    },

    login: function (email, password) {
        var errors = '';

        if (!email.trim()) {
            errors += 'E-mail is empty or blank.';
        } else if (!EMAIL_REGEX.test(email)) {
            errors += 'E-mail is not valid.';
        }

        if (!password.trim()) {
            if (errors) errors += '\n';

            errors += 'Password is empty or blank.\n';
        }

        if (errors) throw new Error(errors);

        var user = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (!user) throw new Error('Wrong credentials.');
    },

    searchDucks: function (query, expression) {
        // TODO validate query, expression

        call('http://duckling-api.herokuapp.com/api/search?q=' + query, expression);
    },

    retrieveDuck: function (id, expression) {
        // TODO validate id, expression

        call('http://duckling-api.herokuapp.com/api/ducks/' + id, expression);
    },

    addDuckToFavourites: function(duck){

        var addToList = true

        favourites_array.forEach( (duck_item) => {
           if(duck_item.id == duck.id){
                addToList = false
           }
        });

        if (addToList){
            favourites_array.push(duck)
        }
        
    },

    getFavouritesList: function(){
        return favourites_array
    }
};