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