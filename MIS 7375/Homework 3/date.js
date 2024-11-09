document.getElementById('today').textContent = new Date().toLocaleDateString();

const today = new Date();

const maxBirthdayDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

const maxYearForBirthdays = today.getFullYear() - 120;
const minBirthdayDate = new Date(maxYearForBirthdays, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // Format: YYYY-MM-DD

document.getElementById('dob').setAttribute('min', minBirthdayDate);
document.getElementById('dob').setAttribute('max', maxBirthdayDate);
