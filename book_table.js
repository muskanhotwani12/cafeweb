document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const date = document.getElementById("date").value;
        const phone = document.getElementById("phone").value.trim();
        const time = document.getElementById("time").value;
        const email = document.getElementById("email").value.trim();
        const people = document.getElementById("people").value;
        const terms = document.getElementById("terms").checked;

        if (!name || !date || !phone || !time || !email || !people || !terms) {
            alert("Please fill out all fields and agree to the terms.");
            return;
        }

        // Phone number validation (basic)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if date is not in the past
        const today = new Date().toISOString().split("T")[0];
        if (date < today) {
            alert("Please select a valid date.");
            return;
        }

        alert(`Thank you, ${name}! Your table for ${people} people is booked on ${date} at ${time}.`);
        form.reset();
    });
});
