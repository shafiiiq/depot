var emailOrPhone;

// email or phone number input setup 
document.getElementById('emailOrPhone').addEventListener('input', function () {

    var input = this.value.trim();
    var checkIn = document.getElementById('emailOrPhone')
    var phoneRegex = /^[0-9]*$/;
    var emailRegex = /^[a-zA-Z0-9.@]*$/;

    if (checkIn.value.trim() == '') {
        this.removeAttribute('name');
    } else if (phoneRegex.test(input)) {
        this.removeAttribute('name');
        this.setAttribute('name', 'phoneNumber');
        emailOrPhone = /^[6789]\d{9}$/;
        console.log('email or phone', emailOrPhone);
    } else if (emailRegex.test(input)) {
        this.removeAttribute('name');
        this.setAttribute('name', 'email');
        emailOrPhone = /^([a-zA-Z0-9\.-]+)@(gmail).(com)/;
        console.log('email or phone', emailOrPhone);
    } else {
        this.removeAttribute('name');
    }
});

//sign in validation
document.addEventListener("DOMContentLoaded", function (event) {

});

var inputElement = document.getElementById('emailOrPhone');
var passwordSign = document.getElementById('password');


inputElement.addEventListener('input', liveValidationSign);
passwordSign.addEventListener('input', liveValidationSign);

function liveValidationSign() {
    if (this.id === 'emailOrPhone') {
        validateEmail(this.value);
    } else if (this.id === 'password') {
        validatePassword(this.value);
    }
}

var validEmail = false;
function validateEmail(value) {
    var errorDiv = document.querySelector('.email-error');
    var requiredError = errorDiv.querySelector('.email-required');
    var formatError = errorDiv.querySelector('.email-format');
    var serverErr = document.getElementById('server-error-message')

    var inputElement = document.getElementById('emailOrPhone');
    var nameAttribute = inputElement.getAttribute('name');
    console.log(nameAttribute);

    requiredError.style.display = formatError.style.display = serverErr.style.display = 'none';

    if (value === "") {
        validEmail = false;
        document.getElementById('emailOrPhone').style.border = "1px solid var(--accent-red)"
        requiredError.style.display = 'flex';
    } else if (!emailOrPhone.test(value)) {
        validEmail = false;

        document.getElementById('emailOrPhone').style.border = "1px solid var(--accent-red)"
        formatError.style.display = 'flex';

        // checking inputing is phone number or email 
        if (nameAttribute === 'phoneNumber') {
            formatError.innerHTML = 'Enter valid phone Number';
        } else {
            formatError.innerHTML = 'Enter valid email address';
        }
    } else {
        validEmail = true;
        document.getElementById('emailOrPhone').style.border = "1px solid var(--accent-green)"
    }
    checkValidity();
}

var validPassword = false;
function validatePassword(value) {
    var errorDiv = document.querySelector('.password-error');
    var requiredError = errorDiv.querySelector('.password-required');
    var minLengthError = errorDiv.querySelector('.password-min-length');
    var serverErr = document.getElementById('server-error-message');

    requiredError.style.display = minLengthError.style.display = serverErr.style.display = 'none';

    if (value === "") {
        validPassword = false;
        document.getElementById('password').style.border = "1px solid var(--accent-red)"
        requiredError.style.display = 'flex';
    } else if (value.length < 8) {
        validPassword = false;
        document.getElementById('password').style.border = "1px solid var(--accent-red)"
        minLengthError.style.display = 'flex';
    } else {
        validPassword = true;
        document.getElementById('password').style.border = "1px solid var(--accent-green)"
    }
    checkValidity();
}

function validationSign() {
    return true;
}

function checkValidity() {
    if (validEmail && validPassword) {
        document.getElementById('submit-btn').disabled = false;
        console.log("enabled");
    } else {
        console.log("disabled");
        document.getElementById('submit-btn').disabled = true;
    }
}
//sign in validation ends