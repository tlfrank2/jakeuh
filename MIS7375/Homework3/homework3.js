/* 
 Name: Tyrese Franklin
 File: homework3.js
 Date Created: 2024-10-12
 Date Updated: 2024-11-09
 Purpose: To validate data and add dynamic features HTML doesn't offer.
*/

function getdata1() {
    var formcontents = document.forms['registration'];
    var formoutput = "<h2>PLEASE REVIEW THIS INFORMATION</h2>"; 
    formoutput += "<div class='output-box'><table>";
    var i; 
    var emailAdded = false; 
    var error_flag = 0;

    var userId = formcontents.elements['userid'].value; 
    var firstName = formcontents.elements['firstname'].value; 
    var lastName = formcontents.elements['lastname'].value; 
    var password = formcontents.elements['pass_hashed'].value; 
    var confirmPassword = formcontents.elements['pass_hashed2'].value; 

    // Password validation
    if (password !== confirmPassword) {
        formoutput += "<tr><td align='right'>Password:</td>"; 
        formoutput += "<td class='outputdata'>Passwords do not match</td></tr>"; 
        error_flag = 1;
    } else if (password === userId || password.includes(userId) || password.includes(firstName) || password.includes(lastName)) {
        formoutput += "<tr><td align='right'>Password:</td>"; 
        formoutput += "<td class='outputdata'>Password cannot contain User ID, First Name, or Last Name</td></tr>"; 
        error_flag = 1; 
    } else { 
        formoutput += "<tr><td align='right'>Password:</td>"; 
        formoutput += "<td class='outputdata'>Valid password</td></tr>"; 
    }

    // First Name validation
    if (firstName.length < 2) {
        formoutput += "<tr><td align='right'>First Name:</td>";
        formoutput += "<td class='outputdata'>Invalid name... too short.</td></tr>"; 
        error_flag = 1; 
    } else if (!firstName.match(/^[a-zA-Z3-5'-]+$/)) {
        formoutput += "<tr><td align='right'>First Name:</td>";
        formoutput += "<td class='outputdata'>Invalid characters in name.</td></tr>"; 
        error_flag = 1; 
    }

    // Last Name validation
    if (lastName.length < 2) {
        formoutput += "<tr><td align='right'>Last Name:</td>"; 
        formoutput += "<td class='outputdata'>Invalid name... too short.</td></tr>"; 
        error_flag = 1; 
    } else if (!lastName.match(/^[a-zA-Z3-5'-]+$/)) {
        formoutput += "<tr><td align='right'>Last Name:</td>";
        formoutput += "<td class='outputdata'>Invalid characters in name.</td></tr>"; 
        error_flag = 1; 
    }

    // Loop through form elements for validation and display
    for (i = 0; i < formcontents.length; i++) {
        var elementName = formcontents.elements[i].name; 
        var elementValue = formcontents.elements[i].value;

        if (formcontents.elements[i].type !== "button" && 
            formcontents.elements[i].type !== "submit" && 
            formcontents.elements[i].type !== "reset") {

            // Checkbox and radio button handling
            if (formcontents.elements[i].type === "checkbox" && formcontents.elements[i].checked) {
                if (elementName === "past_ailments") {
                    formoutput += "<tr><td align='right'>Past Ailments:</td>";
                    formoutput += "<td class='outputdata'>" + elementValue + "</td></tr>";
                }
            } else if (formcontents.elements[i].type === "radio" && formcontents.elements[i].checked) {
                formoutput += "<tr><td align='right'>" + elementName + ":</td>";
                formoutput += "<td class='outputdata'>" + elementValue + "</td></tr>";
            } else if (formcontents.elements[i].type === "text" && elementName !== "ssn_obscured" && elementValue !== "") {
                if (elementName === 'email' && !emailAdded) {
                    emailAdded = true; 
                } else {
                    formoutput += "<tr><td align='right'>" + elementName + ":</td>";
                    formoutput += "<td class='outputdata'>" + elementValue + "</td></tr>"; 
                }
            } else if (formcontents.elements[i].type === "date" && elementName === "dob") {
                const formattedDate = new Date(elementValue).toLocaleDateString(); 
                formoutput += "<tr><td align='right'>Date of Birth:</td>"; 
                formoutput += "<td class='outputdata'>" + formattedDate + "</td></tr>"; 
            }
        }
    }

    // Past Ailments handling
    var pastAilments = []; 
    for (i = 0; i < formcontents.elements.length; i++) {
        if (formcontents.elements[i].type === "checkbox" && formcontents.elements[i].checked) {
            pastAilments.push(formcontents.elements[i].value);
        }
    }

    if (pastAilments.length > 0) {
        formoutput += "<tr><td align='right'>Past Ailments:</td>";
        formoutput += "<td class='outputdata'>" + pastAilments.join(", ") + "</td></tr>"; 
    }

    // SSN handling (masked)
    const ssn = document.getElementById('ssn_obscured').value; 
    const maskedSSN = '***-**-' + ssn.slice(-4); 
    formoutput += "<tr><td align='right'>SSN:</td>";
    formoutput += "<td class='outputdata'>" + maskedSSN + "</td></tr>"; 

    // Email validation
    var email = formcontents.elements['email'].value; 
    if (validateEmail(email)) {
        formoutput += "<tr><td align='right'>Email:</td>"; 
        formoutput += "<td class='outputdata'>" + formatEmail(email) + "</td></tr>"; 
    } else { 
        formoutput += "<tr><td align='right'>Email:</td>"; 
        formoutput += "<td class='outputdata'>Invalid email format</td></tr>"; 
        error_flag = 1; 
    }

    // Phone Number validation
    var phoneNumber = formcontents.elements['phone'].value; 
    if (validatePhoneNumber(phoneNumber)) {
        formoutput += "<tr><td align='right'>Phone Number:</td>"; 
        formoutput += "<td class='outputdata'>" + formatPhoneNumber(phoneNumber) + "</td></tr>"; 
    } else {
        formoutput += "<tr><td align='right'>Phone Number:</td>"; 
        formoutput += "<td class='outputdata'>Invalid phone number format</td></tr>"; 
        error_flag = 1; 
    }

    formoutput += "</table></div>";

    if (error_flag) {
        document.getElementById("output").innerHTML = "<p>Please correct the indicated errors.</p>" + formoutput;
    } else { 
        document.getElementById("output").innerHTML = formoutput; 
    }
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    return emailRegex.test(email); 
}

// Format email for display
function formatEmail(email) { 
    return email.trim().toLowerCase(); 
}

// Phone number validation function
function validatePhoneNumber(phoneNumber) { 
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; 
    return phoneRegex.test(phoneNumber); 
}

// Format phone number for display
function formatPhoneNumber(phoneNumber) { 
    const cleaned = phoneNumber.replace(/\D/g, ''); 
    if (cleaned.length === 10) { 
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`; 
    } 
    return phoneNumber; 
}

// Update the slider value dynamically
function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
}



