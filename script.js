var w = undefined

function workerTrigger(mode) {

    let resultsign = document.getElementById('resultsign')
    let resultlogin = document.getElementById('resultlogin')
    const usernameLogin = document.getElementById('username-login').value
    const usernameRegister = document.getElementById('username-register').value
    const passwordLogin = document.getElementById('password-login').value
    const passwordRegister = document.getElementById('password-register').value
    const repeated_password = document.getElementById('password-again').value

    if(typeof(w) == "undefined") {
        w = new Worker("worker.js")
    }
    console.log('fff',repeated_password, 'ff', passwordRegister)
    w.postMessage([mode, usernameLogin, usernameRegister, passwordLogin, passwordRegister, repeated_password])
    w.onmessage = function(e) {
        if(e.data == 1) {
            resultlogin.innerHTML = 'Welcome, dear user.'
            resultlogin.style.opacity = '100%'
        }

        else if(e.data == 2) {
            resultsign.innerHTML = 'Signed up successfully.'
            resultsign.style.opacity = '100%'
        }

        else if(e.data == 0) {
            resultsign.innerHTML = "Passwords don't match."
            resultsign.style.opacity = '100%'
        }

        else if(e.data == -1) {
            console.log('here out ')
            resultlogin.innerHTML = 'Incorrect password.'
            resultlogin.style.opacity = '100%'
        }

        else if(e.data == -2) {
            resultsign.innerHTML = 'System error encountered.'
            resultsign.style.opacity = '100%'
        }
        w = undefined
    }
}