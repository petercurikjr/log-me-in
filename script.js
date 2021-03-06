var w = undefined

function workerTrigger(mode) {

    //collect data from user html input
    let resultsign = document.getElementById('resultsign')
    let resultlogin = document.getElementById('resultlogin')
    const usernameLogin = document.getElementById('username-login').value
    const usernameRegister = document.getElementById('username-register').value
    const passwordLogin = document.getElementById('password-login').value
    const passwordRegister = document.getElementById('password-register').value
    const repeated_password = document.getElementById('password-again').value

    //check password strength before doing anything
    if(mode == 'signup') {
        if(!passwordChecker(passwordRegister, resultsign)) {
            return
        }
    }

    //create a new javascript worker
    if(typeof(w) == "undefined") {
        w = new Worker("worker.js")
    }
    w.postMessage([mode, usernameLogin, usernameRegister, passwordLogin, passwordRegister, repeated_password])

    //evaluate server response and show message to the user
    w.onmessage = function(e) {
        //login success
        if(e.data == 1) {
            resultlogin.innerHTML = 'Welcome, ' + usernameLogin + '.'
            resultlogin.style.opacity = '100%'
            setTimeout(function(){
                resultlogin.style.opacity = '0%'
            }, 5000)
        }

        //registration success
        else if(e.data == 2) {
            resultsign.innerHTML = 'Signed up successfully.'
            resultsign.style.opacity = '100%'
            setTimeout(function(){
                resultsign.style.opacity = '0%'
            }, 5000)
        }

        //password fields during registration dont match
        else if(e.data == 0) {
            resultsign.innerHTML = "Passwords don't match."
            resultsign.style.opacity = '100%'
            setTimeout(function(){
                resultsign.style.opacity = '0%'
            }, 5000)
        }

        //login fail
        else if(e.data == -1) {
            resultlogin.innerHTML = 'Incorrect login.'
            resultlogin.style.opacity = '100%'
            setTimeout(function(){
                resultlogin.style.opacity = '0%'
            }, 5000)
        }

        //registration fail (user already exists)
        else if(e.data == -2) {
            resultsign.innerHTML = 'User already exists.'
            resultsign.style.opacity = '100%'
            setTimeout(function(){
                resultsign.style.opacity = '0%'
            }, 5000)
        }

        //clean the worker after we got a message from him
        w = undefined
    }
}

function passwordChecker(password, resultsign) {
    //check password length
    if(password.length < 8) {
        resultsign.innerHTML = 'Password too short.'
        resultsign.style.opacity = '100%'
        setTimeout(function(){
            resultsign.style.opacity = '0%'
        }, 3000)
        return false
    }

    //check if password contains at least one number and at least one letter
    else if(!(/\d/.test(password) && /[a-zA-Z]/.test(password))) {
        resultsign.innerHTML = 'Password should contain' + '<br />' + 'letters and numbers.'
        resultsign.style.opacity = '100%'
        setTimeout(function(){
            resultsign.style.opacity = '0%'
        }, 4000)
        return false
    }

    //check whether password contains only small letters
    else if(password == password.toLowerCase()) {
        resultsign.innerHTML = 'Password should contain' + '<br />' + 'big letters as well.'
        resultsign.style.opacity = '100%'
        setTimeout(function(){
            resultsign.style.opacity = '0%'
        }, 4000)
        return false
    }

    //check whether password contains only capital letters
    else if(password == password.toUpperCase()) {
        resultsign.innerHTML = 'Password should contain' + '<br />' +  'small letters as well.'
        resultsign.style.opacity = '100%'
        setTimeout(function(){
            resultsign.style.opacity = '0%'
        }, 4000)
        return false
    }

    //check if password contains words easily guessible by the attacker
    if(!dictionaryChekcer(password)) {
        resultsign.innerHTML = 'Password should not contain' + '<br />' + 'easily guessed words.'
        resultsign.style.opacity = '100%'
        setTimeout(function(){
            resultsign.style.opacity = '0%'
        }, 4000)
        return false
    }

    return true
}

function dictionaryChekcer(password) {
    //get the dictionary file
    const dicData = document.getElementById('dict').contentWindow.document.getElementById('calibre_link-0').textContent
    //create an array from dictionary file and parse every word into an element of that array
    wordsArr = dicData.split('\n')

    //search the array
    for(let i = 0; i < wordsArr.length; i++) {
        //check if password contains a word from the dictionary which is at least 3 chars long
        if(((password.toLowerCase()).indexOf((wordsArr[i]).toLowerCase()) != -1) && (wordsArr[i].length > 2)) {
            return false
        }
    }

    return true
}