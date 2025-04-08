document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve stored credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Validate login
    if (username === storedUsername && password === storedPassword) {
        alert("Login Successful!");
        window.location.href = 'index1.html'; // Redirect on successful login
    } else {
        document.getElementById('message').innerText = 'Invalid username or password';
    }
});

// Step 1: Name, Phone, Email Form Submission
document.getElementById('signupStep1').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    // Store data temporarily
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('email', email);

    // Move to next step
    nextStep();
});

// Step 2: Password Creation Form Submission
document.getElementById('signupStep2').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const newUsername = localStorage.getItem('fullName'); // Using stored full name as username
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('ConfirmPassword').value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Save to local storage (simulate account creation)
    localStorage.setItem('username', newUsername);
    localStorage.setItem('password', newPassword);

    // Show success message
    document.getElementById('createMessage').innerText = 'Account created successfully! Redirecting to login...';

    // Redirect to login after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html?form=login';
    }, 2000);
});

// Toggle between Login & Signup
function toggleForm(showSignup = false) {
    document.getElementById("loginForm").style.display = showSignup ? "none" : "block";
    document.getElementById("signupStep1").style.display = showSignup ? "block" : "none";
    document.getElementById("signupStep2").style.display = "none"; 
    document.getElementById("formTitle").innerText = showSignup ? "Create Account" : "Login";
}

// Move to Next Signup Step
function nextStep() {
    document.getElementById("signupStep1").style.display = "none";
    document.getElementById("signupStep2").style.display = "block";
}

// Move Back to First Step
function prevStep() {
    document.getElementById("signupStep1").style.display = "block";
    document.getElementById("signupStep2").style.display = "none";
}

// Auto-detect form type from URL
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');
    toggleForm(formType === "signup");
};
