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
});

function getdata1() {
    var formcontents = document.forms['registration'];
    var formoutput = "<h2>Please review the following information:</h2>";
    formoutput += "<ul>";  
    var errorMessages = [];
    var error_flag = 0;

    var userId = formcontents.elements['userid'].value;
    var firstName = formcontents.elements['firstname'].value;
    var lastName = formcontents.elements['lastname'].value;
    var password = formcontents.elements['pass_hashed'].value;
    var confirmPassword = formcontents.elements['pass_hashed2'].value;
    var email = formcontents.elements['email'].value;
    var phoneNumber = formcontents.elements['phone'].value;

    if (password !== confirmPassword) {
        errorMessages.push("Passwords do not match.");
        error_flag = 1;
    } else if (password === userId || password.includes(userId) || password.includes(firstName) || password.includes(lastName)) {
        errorMessages.push("Password cannot contain User ID, First Name, or Last Name.");
        error_flag = 1;
    }

    if (firstName.length < 2 || !firstName.match(/^[a-zA-Z'-]+$/)) {
        errorMessages.push("Invalid First Name: Too short or contains invalid characters.");
        error_flag = 1;
    }

    if (lastName.length < 2 || !lastName.match(/^[a-zA-Z'-]+$/)) {
        errorMessages.push("Invalid Last Name: Too short or contains invalid characters.");
        error_flag = 1;
    }

    if (!validateEmail(email)) {
        errorMessages.push("Invalid email format.");
        error_flag = 1;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        errorMessages.push("Invalid phone number format.");
        error_flag = 1;
    }

    for (i = 0; i < formcontents.length; i++) {
        var elementName = formcontents.elements[i].name;
        var elementValue = formcontents.elements[i].value;

        if (formcontents.elements[i].type !== "button" && 
            formcontents.elements[i].type !== "submit" && 
            formcontents.elements[i].type !== "reset") {

            if (formcontents.elements[i].type === "checkbox" && formcontents.elements[i].checked) {
                if (elementName === "past_ailments") {
                    formoutput += `<li><strong>Past Ailments:</strong> ${elementValue}</li>`;
                }
            } else if (formcontents.elements[i].type === "radio" && formcontents.elements[i].checked) {
                formoutput += `<li><strong>${elementName}:</strong> ${elementValue}</li>`;
            } else if (formcontents.elements[i].type === "text" && elementName !== "ssn_obscured" && elementValue !== "") {
                formoutput += `<li><strong>${elementName}:</strong> ${elementValue}</li>`;
            } else if (formcontents.elements[i].type === "date" && elementName === "dob") {
                const formattedDate = new Date(elementValue).toLocaleDateString();
                formoutput += `<li><strong>Date of Birth:</strong> ${formattedDate}</li>`;
            }
        }
    }

    if (error_flag) {
        alert("Please correct the following errors:\n\n" + errorMessages.join("\n"));
        document.getElementById("submit-btn").style.display = "none"; 
    } else {
        alert("All fields are valid. You may now submit the form.");
        document.getElementById("submit-btn").style.display = "inline"; 
    }

    if (errorMessages.length > 0) {
        formoutput += "<li><strong>Errors:</strong></li>";
        formoutput += "<ul>";  
        errorMessages.forEach(function(msg) {
            formoutput += `<li>${msg}</li>`;
        });
        formoutput += "</ul>";
    }

    formoutput += "</ul>";  
    document.getElementById("output").innerHTML = formoutput;
}


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms['registration'];

    form['userid'].addEventListener("input", function() { validateField('userid', validateUserId, 'User ID should be at least 5 characters.'); });
    form['firstname'].addEventListener("input", function() { validateField('firstname', validateFirstName, 'First name is too short or contains invalid characters.'); });
    form['lastname'].addEventListener("input", function() { validateField('lastname', validateLastName, 'Last name is too short or contains invalid characters.'); });
    form['pass_hashed'].addEventListener("input", function() { validateField('pass_hashed', validatePassword, 'Password cannot contain User ID, First Name, or Last Name.'); });
    form['pass_hashed2'].addEventListener("input", function() { validateField('pass_hashed2', validateConfirmPassword, 'Passwords do not match.'); });
    form['email'].addEventListener("input", function() { validateField('email', validateEmailField, 'Invalid email format.'); });
    form['phone'].addEventListener("input", function() { validateField('phone', validatePhoneField, 'Invalid phone number format.'); });
});

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

document.addEventListener("DOMContentLoaded", function () {
    const validateButton = document.getElementById('validate-btn');
    
    validateButton.addEventListener('click', function(event) {
        event.preventDefault();  
        getdata1();              
    });
});

function getdata1() {
    var formcontents = document.forms['registration'];
    var formoutput = "<h2>Please review the following information:</h2>";
    formoutput += "<ul>";  
    var errorMessages = [];
    var error_flag = 0;

    var userId = formcontents.elements['userid'].value;
    var firstName = formcontents.elements['firstname'].value;
    var lastName = formcontents.elements['lastname'].value;
    var password = formcontents.elements['pass_hashed'].value;
    var confirmPassword = formcontents.elements['pass_hashed2'].value;
    var email = formcontents.elements['email'].value;
    var phoneNumber = formcontents.elements['phone'].value;

    if (password !== confirmPassword) {
        errorMessages.push("Passwords do not match.");
        error_flag = 1;
    } else if (password === userId || password.includes(userId) || password.includes(firstName) || password.includes(lastName)) {
        errorMessages.push("Password cannot contain User ID, First Name, or Last Name.");
        error_flag = 1;
    }

    if (firstName.length < 2 || !firstName.match(/^[a-zA-Z'-]+$/)) {
        errorMessages.push("Invalid First Name: Too short or contains invalid characters.");
        error_flag = 1;
    }

    if (lastName.length < 2 || !lastName.match(/^[a-zA-Z'-]+$/)) {
        errorMessages.push("Invalid Last Name: Too short or contains invalid characters.");
        error_flag = 1;
    }

    if (!validateEmail(email)) {
        errorMessages.push("Invalid email format.");
        error_flag = 1;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        errorMessages.push("Invalid phone number format.");
        error_flag = 1;
    }

    for (i = 0; i < formcontents.length; i++) {
        var elementName = formcontents.elements[i].name;
        var elementValue = formcontents.elements[i].value;

        if (formcontents.elements[i].type !== "button" && 
            formcontents.elements[i].type !== "submit" && 
            formcontents.elements[i].type !== "reset") {

            if (formcontents.elements[i].type === "checkbox" && formcontents.elements[i].checked) {
                if (elementName === "past_ailments") {
                    formoutput += `<li><strong>Past Ailments:</strong> ${elementValue}</li>`;
                }
            } else if (formcontents.elements[i].type === "radio" && formcontents.elements[i].checked) {
                formoutput += `<li><strong>${elementName}:</strong> ${elementValue}</li>`;
            } else if (formcontents.elements[i].type === "text" && elementName !== "ssn_obscured" && elementValue !== "") {
                formoutput += `<li><strong>${elementName}:</strong> ${elementValue}</li>`;
            } else if (formcontents.elements[i].type === "date" && elementName === "dob") {
                const formattedDate = new Date(elementValue).toLocaleDateString();
                formoutput += `<li><strong>Date of Birth:</strong> ${formattedDate}</li>`;
            }
        }
    }

    if (error_flag) {
        alert("Please correct the following errors:\n\n" + errorMessages.join("\n"));
        document.getElementById("submit-btn").style.display = "none"; 
    } else {
        alert("All fields are valid. You may now submit the form.");
        document.getElementById("submit-btn").style.display = "inline"; 
    }

    if (errorMessages.length > 0) {
        formoutput += "<li><strong>Errors:</strong></li>";
        formoutput += "<ul>";  
        errorMessages.forEach(function(msg) {
            formoutput += `<li>${msg}</li>`;
        });
        formoutput += "</ul>";
    }

    formoutput += "</ul>";  
    document.getElementById("output").innerHTML = formoutput;
}


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms['registration'];

    form['userid'].addEventListener("input", function() { validateField('userid', validateUserId, 'User ID should be at least 5 characters.'); });
    form['firstname'].addEventListener("input", function() { validateField('firstname', validateFirstName, 'First name is too short or contains invalid characters.'); });
    form['lastname'].addEventListener("input", function() { validateField('lastname', validateLastName, 'Last name is too short or contains invalid characters.'); });
    form['pass_hashed'].addEventListener("input", function() { validateField('pass_hashed', validatePassword, 'Password cannot contain User ID, First Name, or Last Name.'); });
    form['pass_hashed2'].addEventListener("input", function() { validateField('pass_hashed2', validateConfirmPassword, 'Passwords do not match.'); });
    form['email'].addEventListener("input", function() { validateField('email', validateEmailField, 'Invalid email format.'); });
    form['phone'].addEventListener("input", function() { validateField('phone', validatePhoneField, 'Invalid phone number format.'); });
});

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
