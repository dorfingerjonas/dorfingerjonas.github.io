let reCaptchaCorrect = false;
let tempToken = '';

window.addEventListener('load', () => {
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const errorEmail = document.getElementById('errorEmail');
    const sendEmailBtn = document.getElementById('sendEmail');

    const firebaseConfig = {
        apiKey: "AIzaSyBd4ZNQRImSA-DLkRuQUShh8jqH-L9DVJM",
        authDomain: "jonas-dorfinger.firebaseapp.com",
        databaseURL: "https://jonas-dorfinger.firebaseio.com",
        projectId: "jonas-dorfinger",
        storageBucket: "jonas-dorfinger.appspot.com",
        messagingSenderId: "47344971189",
        appId: "1:47344971189:web:7dd58623493ae508"
    };

    firebase.initializeApp(firebaseConfig);

    sendEmailBtn.addEventListener('click', () => {
        let isValid = true;

        // check email
        if (email.value.trim().length === 0) {
            email.classList.add('errorInput');
            errorEmail.textContent = 'email must not be empty';
            isValid = false;
        } else {
            if (validateEmail(email.value)) {
                email.classList.remove('errorInput');
            } else {
                email.classList.add('errorInput');
                errorEmail.textContent = 'invalid email';
                isValid = false;
            }
        }

        // check subject
        if (subject.value.trim().length === 0) {
            subject.classList.add('errorInput');
            errorEmail.textContent = 'subject must not be empty.';
            isValid = false;
        } else {
            subject.classList.remove('errorInput');
        }

        // check message
        if (message.value.trim().length === 0) {
            message.classList.add('errorInput');
            errorEmail.textContent = 'message must not be empty.';
            isValid = false;
        } else {
            message.classList.remove('errorInput');
        }

        if (!reCaptchaCorrect) {
            errorEmail.textContent = 'you have to complete reCAPTCHA.';
            isValid = false;
        }
        
        if (isValid) {
            firebase.database().ref('public/email/' + new Date().getTime()).set({
                message: message.value,
                email: email.value,
                subject: subject.value,
                token: tempToken
            }).then(() => {
                email.value = '';
                subject.value = '';
                message.value = '';

                errorEmail.style.color = 'black';
                errorEmail.textContent = 'message sent successfully!';
            
                setTimeout(() => {
                    errorEmail.innerHTML = '&nbsp;';
                    errorEmail.style.color = 'red';
                    grecaptcha.reset();
                }, 3500);
            });
        }
    });
});

function validateEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function recaptchaCompleted(token) {
    tempToken = grecaptcha.getResponse();
    
    reCaptchaCorrect = true;

    setTimeout(() => {
        reCaptchaCorrect = false;
    }, 120000);
}