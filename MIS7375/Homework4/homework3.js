/* 
 Name: Tyrese Franklin
 File: homework3.js
 Date Created: 2024-10-20
 Date Updated: 2024-12-04
 Purpose: To validate data on the fly and manage cookies.
*/

function formValidation() {
    const firstName = document.forms['registration']['firstname'].value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (rememberMe) {
        setCookie('firstName', firstName, 2); // Set cookie for 2 days
    } else {
        deleteCookie('firstName');
    }
    return true; // Proceed with form submission
}

document.addEventListener('DOMContentLoaded', () => {
    const userFirstName = getCookie('firstName');
    if (userFirstName) {
        document.forms['registration']['firstname'].value = userFirstName;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const validateButton = document.getElementById('validate-btn');
    const form = document.forms['registration'];

    // Pre-fill form fields from cookies if available
    loadFormFromCookies(form);

    validateButton.addEventListener('click', function (event) {
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

    // Password validation
    if (password !== confirmPassword) {
        errorMessages.push("Passwords do not match.");
        error_flag = 1;
    } else if (password.includes(userId) || password.includes(firstName) || password.includes(lastName)) {
        errorMessages.push("Password cannot contain User ID, First Name, or Last Name.");
        error_flag = 1;
    }

    // Name validation
    if (!validateFirstName(firstName)) {
        errorMessages.push("Invalid First Name: Too short or contains invalid characters.");
        error_flag = 1;
    }

    if (!validateLastName(lastName)) {
        errorMessages.push("Invalid Last Name: Too short or contains invalid characters.");
        error_flag = 1;
    }

    // Email and phone validation
    if (!validateEmail(email)) {
        errorMessages.push("Invalid email format.");
        error_flag = 1;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        errorMessages.push("Invalid phone number format.");
        error_flag = 1;
    }

    if (error_flag) {
        alert("Please correct the following errors:\n\n" + errorMessages.join("\n"));
        document.getElementById("submit-btn").style.display = "none";
    } else {
        alert("All fields are valid. You may now submit the form.");
        document.getElementById("submit-btn").style.display = "inline";

        // Save valid data to cookies
        saveFormToCookies(formcontents);
    }

    // Output errors and form details
    if (errorMessages.length > 0) {
        formoutput += "<li><strong>Errors:</strong></li><ul>";
        errorMessages.forEach(function (msg) {
            formoutput += `<li>${msg}</li>`;
        });
        formoutput += "</ul>";
    }
    formoutput += "</ul>";
    document.getElementById("output").innerHTML = formoutput;
}

// Save form data to cookies
function saveFormToCookies(form) {
    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.name && element.type !== "button" && element.type !== "submit") {
            const value = element.type === "checkbox" ? element.checked : element.value;
            document.cookie = `${encodeURIComponent(element.name)}=${encodeURIComponent(value)}; path=/; max-age=86400`; // 1 day
        }
    }
}

// Load form data from cookies
function loadFormFromCookies(form) {
    const cookies = document.cookie.split("; ");
    const cookieData = {};
    cookies.forEach(cookie => {
        const [key, value] = cookie.split("=");
        cookieData[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.name && cookieData[element.name] !== undefined) {
            if (element.type === "checkbox") {
                element.checked = cookieData[element.name] === "true";
            } else {
                element.value = cookieData[element.name];
            }
        }
    }
}

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

function validateFirstName(firstName) {
    return firstName.length >= 2 && /^[a-zA-Z'-]+$/.test(firstName);
}

function validateLastName(lastName) {
    return lastName.length >= 2 && /^[a-zA-Z'-]+$/.test(lastName);
}

