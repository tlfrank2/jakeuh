/* 
 Name: Tyrese Franklin
 File: homework3.js
 Date Created: 2024-10-20
 Date Updated: 2024-11-9
 Purpose: To validate data on the fly.
*/

document.addEventListener("DOMContentLoaded", function () {
    const validateButton = document.getElementById('validate-btn');

    validateButton.addEventListener('click', function(event) {
        event.preventDefault();  
        getdata1();              
    });

    const form = document.forms['registration'];

    form['userid'].addEventListener("input", function() { validateField('userid', validateUserId, 'User ID should be at least 5 characters.'); });
    form['firstname'].addEventListener("input", function() { validateField('firstname', validateFirstName, 'First name is too short or contains invalid characters.'); });
    form['lastname'].addEventListener("input", function() { validateField('lastname', validateLastName, 'Last name is too short or contains invalid characters.'); });
    form['pass_hashed'].addEventListener("input", function() { validateField('pass_hashed', validatePassword, 'Password cannot contain User ID, First Name, or Last Name.'); });
    form['pass_hashed2'].addEventListener("input", function() { validateField('pass_hashed2', validateConfirmPassword, 'Passwords do not match.'); });
    form['email'].addEventListener("input", function() { validateField('email', validateEmailField, 'Invalid email format.'); });
    form['phone'].addEventListener("input", function() { validateField('phone', validatePhoneField, 'Invalid phone number format.'); });
});

function getdata1() {
    // ... Your existing getdata1 logic ...
}

function validateField(fieldId, validationFunction, errorMessage) {
    const field = document.forms['registration'].elements[fieldId];
    const messageBox = displayMessage(fieldId, validationFunction(field.value) ? "" : errorMessage);

    if (validationFunction(field.value)) {
        messageBox.style.backgroundColor = "green"; 
        messageBox.innerText = "Valid input!";
    } else {
        messageBox.style.backgroundColor = "red";  
        messageBox.innerText = errorMessage;
    }
    messageBox.style.display = "block";  
}

function displayMessage(fieldId, message) {
    let messageBox = document.getElementById(`${fieldId}-message`);
    
    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = `${fieldId}-message`;
        messageBox.className = "validation-message";
        document.body.appendChild(messageBox);
    }
    
    messageBox.innerText = message;
    return messageBox;
}

// Validation functions
function validateUserId(userId) {
    return userId.length >= 5;
}

function validateFirstName(firstName) {
    return firstName.length >= 2 && /^[a-zA-Z'-]+$/.test(firstName);
}

function validateLastName(lastName) {
    return lastName.length >= 2 && /^[a-zA-Z'-]+$/.test(lastName);
}

function validatePassword(password) {
    const form = document.forms['registration'];
    const userId = form.elements['userid'].value;
    const firstName = form.elements['firstname'].value;
    const lastName = form.elements['lastname'].value;
    return !(password.includes(userId) || password.includes(firstName) || password.includes(lastName));
}

function validateConfirmPassword() {
    const form = document.forms['registration'];
    const password = form.elements['pass_hashed'].value;
    const confirmPassword = form.elements['pass_hashed2'].value;
    return password === confirmPassword;
}

function validateEmailField(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePhoneField(phoneNumber) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}
