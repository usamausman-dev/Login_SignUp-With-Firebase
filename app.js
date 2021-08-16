let googleSignin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            var { displayName, email, phoneNumber, photoURL } = user;
            setUser(displayName, email, phoneNumber, photoURL);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            alert(errorMessage);
        });
}


function signin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (document.getElementById('admin').checked) {
        // role = document.getElementById('admin').value;
        // alert(role);
        if (email == 'admin@gmail.com' && password == 'admin') {
            window.location.replace('admin.html');
        }
        else {
            alert('Incorrect Credentials')
        }
    }
    else if (document.getElementById('user').checked) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;

                var { displayName, email, phoneNumber, photoURL } = user;
                setUser(displayName, email, phoneNumber, photoURL);
                window.location.replace('user.html');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }
    else {
        alert('Please Select a Role...');
    }



    // //Setting the fields to be empty
    // document.getElementById('email').value = '';
    // document.getElementById('password').value = '';
}

function signup() {
    var email = document.getElementById('uemail').value;
    var password = document.getElementById('upass').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    //Setting the fields to be empty    
    document.getElementById('uemail').value = '';
    document.getElementById('upass').value = '';
}

function setUser(userName, email, phone, photo) {
    var currentUser = {
        userName, email, phone, photo
    }
    console.log(currentUser);
}