//communication with the server is handled in this .js file

function evaluateInput(mode, usernameLogin, usernameRegister, passwordLogin, passwordRegister, repeated_password) {    
    setTimeout(function() {    
        if (mode == 'login') {

            let xhr = new XMLHttpRequest()
            xhr.open("POST", "https://backend-logmein.herokuapp.com/verify", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            //handle the server response
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if(xhr.status === 201) {
                        console.log('veryfied.')
                        //send value 1 back to script.js (which will be evaluated there)
                        postMessage(1)
                        self.close()
                    }
                    else {
                        console.log('LOGIN: wrong username or password.')
                        //send value -1 back to script.js (which will be evaluated there)                        
                        postMessage(-1)
                        self.close()
                    }
                }
            }

            //create a json and send it to the server
            let data = 
            {
                "username": usernameLogin,
                "password": passwordLogin
            }

            let jsonData = JSON.stringify(data)
            //send the request with the data
            xhr.send(jsonData)
        }

        else if(mode == 'signup') {
            if(passwordRegister != repeated_password) {
                console.log('repeated password does not equal password.')
                //send value 0 back to script.js (which will be evaluated there)
                postMessage(0)
                self.close()
                return
            }

            let xhr = new XMLHttpRequest()
            xhr.open("POST", "https://backend-logmein.herokuapp.com/register", true)
            xhr.setRequestHeader("Content-Type", "application/json")
            //handle the server response
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if(xhr.status === 201) {
                        console.log('successfully signed up.')
                        //send value 2 back to script.js (which will be evaluated there)
                        postMessage(2)
                        self.close()
                    }
                    else {
                        console.log('SIGNUP: failed.')
                        //send value -2 back to script.js (which will be evaluated there)
                        postMessage(-2)
                        self.close()
                    }
                }
            }

            //create a json and send it to the server
            let data = 
            {
                "username": usernameRegister,
                "password": passwordRegister
            }

            let jsonData = JSON.stringify(data)
            //send the request with the data
            xhr.send(jsonData)
        }
    }, 1000) //limit requests to one second / each (security delay)
}

onmessage = function(e) {
    //do this function when worker is triggered from script.js by "w.postMessage()"
    evaluateInput(e.data[0], e.data[1], e.data[2], e.data[3], e.data[4], e.data[5])
}