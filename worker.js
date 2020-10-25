function evaluateInput(mode, usernameLogin, usernameRegister, passwordLogin, passwordRegister, repeated_password) {    
    setTimeout(function() {    
        if (mode == 'login') {

            let xhr = new XMLHttpRequest()
            xhr.open("POST", "https://backend-logmein.herokuapp.com/verify", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if(xhr.status === 201) {
                        console.log('veryfied.')
                        postMessage(1)
                    }
                    else {
                        console.log('LOGIN: wrong username or password.')
                        postMessage(-1)
                    }
                }
            }

            let data = 
            {
                "username": usernameLogin,
                "password": passwordRegister
            }

            let jsonData = JSON.stringify(data)
            xhr.send(jsonData)
        }

        else if(mode == 'signup') {
            console.log(passwordRegister, repeated_password)
            if(passwordRegister != repeated_password) {
                console.log('repeated password does not equal password.')
                postMessage(0)
                return
            }

            let xhr = new XMLHttpRequest()
            xhr.open("POST", "https://backend-logmein.herokuapp.com/register", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if(xhr.status === 201) {
                        console.log('successfully signed up.')
                        postMessage(2)
                    }
                    else {
                        console.log('SIGNUP: failed.')
                        postMessage(-2)
                    }
                }
            }

            let data = 
            {
                "username": usernameRegister,
                "password": passwordRegister
            }

            let jsonData = JSON.stringify(data)
            xhr.send(jsonData)
        }
    }, 1000)
}

onmessage = function(e) {
    evaluateInput(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4], e.data[5])
}