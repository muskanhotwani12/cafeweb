// ⭐ Rating System
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("selected-rating");
let selectedRating = 4; // Default rating

stars.forEach(star => {
    star.addEventListener("click", function() {
        selectedRating = this.getAttribute("data-value");
        updateStars(selectedRating);
    });
});

function updateStars(rating) {
    stars.forEach(star => {
        if (star.getAttribute("data-value") <= rating) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });
    ratingText.innerHTML = `Your rating: ${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
}

function submitRating() {
    alert(`Thank you for rating us ${selectedRating} stars!`);
}

// ⭐ Table Booking System
function bookTable(event) {
    event.preventDefault();
    alert("Your table has been booked successfully!");
}

// 🍽️ Food Customization
function submitCustomization() {
    alert("Your customization has been saved!");
}

// 🚚 Order Tracking System
let orderStatus = ["Being Prepared", "Out for Delivery", "Delivered"];
let currentIndex = 0;

function updateOrderStatus() {
    if (currentIndex < orderStatus.length - 1) {
        currentIndex++;
        document.getElementById("order-status").innerText = `Your order is: ${orderStatus[currentIndex]}`;
    } else {
        alert("Your order has been delivered!");
    }
}


function toggleVoiceOrder() {
    const result = document.getElementById("order-result");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    result.innerText = "Listening...";

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        result.innerText = `You said: "${command}"`;
        // You can add parsing logic for placing order here
    };

    recognition.onerror = () => {
        result.innerText = "Sorry, couldn't catch that. Try again!";
    };
}

function submitCustomization() {
    const options = document.querySelectorAll('.custom-option');
    const specialNote = document.getElementById('special-note').value.trim();
    const spiceLevel = document.getElementById('spice-level').value;
    const message = document.getElementById('customization-message');
  
    let selectedOptions = [];
    options.forEach(option => {
      if (option.checked) {
        selectedOptions.push(option.value);
      }
    });
  
    let finalMessage = "✅ Your custom order includes: ";
    finalMessage += selectedOptions.length ? selectedOptions.join(", ") : "No custom add-ons";
    finalMessage += `. 🔥 Spice Level: ${spiceLevel}`;
    
    if (specialNote) {
      finalMessage += `. 📝 Note: ${specialNote}`;
    }
  
    message.innerText = finalMessage;
  
    setTimeout(() => {
      message.innerText = "";
    }, 8000);
  }
  
