window.addEventListener('load', () => {
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const errorEmail = document.getElementById('errorEmail');
    const sendEmailBtn = document.getElementById('sendEmail');

    sendEmailBtn.addEventListener('click', () => {
        let isValid = true;

        // check email
        if (email.value.replace(' ', '').length === 0) {
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
        if (subject.value.replace(' ', '').length === 0) {
            email.classList.add('errorInput');
            errorEmail.textContent = 'subject must not be empty.';
            isValid = false;
        } else {
            email.classList.remove('errorInput');
        }

        // check message
        if (email.value.replace(' ', '').length === 0) {
            email.classList.add('errorInput');
            errorEmail.textContent = 'message must not be empty.';
            isValid = false;
        } else {
            email.classList.remove('errorInput');
        }
        
    });
});

function validateEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}