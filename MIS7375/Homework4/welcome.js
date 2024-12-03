document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('welcome-message');
    const form = document.getElementById('user-form');
    const rememberMe = document.getElementById('remember-me');

    // Utility functions
    const setCookie = (name, value, hours) => {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    };

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) return value;
        }
        return null;
    };

    const deleteCookie = (name) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    };

    // Check if user has been here before
    const firstName = getCookie('firstName');
    if (firstName) {
        header.innerHTML = `Welcome back, ${firstName}!`;
        const newUserCheckbox = document.createElement('label');
        newUserCheckbox.innerHTML = `
            <input type="checkbox" id="new-user"> 
            Not ${firstName}? Click here to start as a new user.
        `;
        header.appendChild(newUserCheckbox);

        // Clear cookie and reset form when "new user" is checked
        document.getElementById('new-user').addEventListener('change', (event) => {
            if (event.target.checked) {
                deleteCookie('firstName');
                form.reset();
                header.innerHTML = "Welcome New User!";
            }
        });
    } else {
        header.innerHTML = 'Welcome New User!';
    }

    // Form submission (updated to handle validation, cookies, and redirection)
    form.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent the default form submission

        // Get the name from the form
        const name = document.getElementById('first-name').value;

        // Form validation
        if (!name) {
            alert("First name is required!");
            return;  // Stop submission if validation fails
        }

        // Handle cookie creation based on "remember me" checkbox
        if (rememberMe.checked) {
            setCookie('firstName', name, 48);  // Save cookie for 48 hours
        } else {
            deleteCookie('firstName');  // Delete cookie if not remembered
        }

        // Update header message and redirect
        header.innerHTML = `Welcome back, ${name}!`;
        alert('Form submitted successfully.');

        // Redirect to thank you page
        window.location.href = 'homework1-thankyou.html';
    });
});

