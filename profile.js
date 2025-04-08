// Initialize settings dropdown behavior
const settingsMenu = document.querySelector('.settings-menu');
const settingsDropdown = document.querySelector('.settings-dropdown');

settingsMenu.addEventListener('click', function(e) {
    e.preventDefault();
    settingsDropdown.style.display = settingsDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!settingsMenu.contains(e.target)) {
        settingsDropdown.style.display = 'none';
    }
});

function toggleEditMode() {
    const form = document.getElementById('profile-form');
    const view = document.getElementById('profile-view');
    
    form.style.display = 'block';
    view.style.display = 'none';
    document.getElementById('name').focus();
    window.scrollTo(0, document.getElementById('profile-section').offsetTop);
}

// Update the profile view with current data
function updateProfileView() {
    const profile = JSON.parse(localStorage.getItem('userProfile')) || {};
    document.getElementById('view-name').textContent = profile.name || 'Not set';
    document.getElementById('view-phone').textContent = profile.phone || 'Not set';
    document.getElementById('view-email').textContent = profile.email || 'Not set';
    document.getElementById('view-address').textContent = profile.address || 'Not set';
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const profileImg = document.getElementById('profile-img');
    const imageUpload = document.getElementById('image-upload');
    const profileForm = document.getElementById('profile-form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');

    // Load saved profile data
    function loadProfile() {
        const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        if (savedProfile.name) nameInput.value = savedProfile.name;
        if (savedProfile.phone) phoneInput.value = savedProfile.phone;
        if (savedProfile.email) emailInput.value = savedProfile.email;
        if (savedProfile.address) addressInput.value = savedProfile.address;
        if (savedProfile.profileImage) profileImg.src = savedProfile.profileImage;
        updateProfileView();
    }

    // Handle profile image upload
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImg.src = event.target.result;
                // Save to localStorage
                const profile = JSON.parse(localStorage.getItem('userProfile')) || {};
                profile.profileImage = event.target.result;
                localStorage.setItem('userProfile', JSON.stringify(profile));
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const profileData = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            address: addressInput.value,
            profileImage: profileImg.src
        };

        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        // Show success message and return to view mode
        alert('Profile saved successfully!');
        updateProfileView();
        document.getElementById('profile-form').style.display = 'none';
        document.getElementById('profile-view').style.display = 'block';
    });

    // Load profile when page loads
    loadProfile();
});
