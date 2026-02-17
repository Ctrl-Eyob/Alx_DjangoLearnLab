// Main JavaScript file
console.log('Django Blog loaded successfully!');
// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide messages after 5 seconds
    const messages = document.querySelectorAll('.alert');
    messages.forEach(function(message) {
        setTimeout(function() {
            message.style.transition = 'opacity 0.5s';
            message.style.opacity = '0';
            setTimeout(function() {
                message.remove();
            }, 500);
        }, 5000);
    });

    // Mobile menu toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    
    const nav = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768 && nav && navMenu) {
        nav.insertBefore(navToggle, navMenu);
        
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                    
                    // Create error message if not exists
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('small');
                        errorMsg.className = 'error-message text-danger';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Password strength indicator (for registration page)
    const passwordField = document.querySelector('#id_password1');
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength += 1;
            if (password.match(/[a-z]/)) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
            
            let strengthText = '';
            let strengthClass = '';
            
            switch(strength) {
                case 0:
                case 1:
                    strengthText = 'Weak';
                    strengthClass = 'weak';
                    break;
                case 2:
                case 3:
                    strengthText = 'Medium';
                    strengthClass = 'medium';
                    break;
                case 4:
                case 5:
                    strengthText = 'Strong';
                    strengthClass = 'strong';
                    break;
            }
            
            // Create or update strength indicator
            let indicator = document.querySelector('.password-strength');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'password-strength';
                passwordField.parentNode.appendChild(indicator);
            }
            
            indicator.textContent = `Password strength: ${strengthText}`;
            indicator.className = `password-strength ${strengthClass}`;
        });
    }

    // Preview profile picture before upload
    const profilePicInput = document.querySelector('#id_profile_picture');
    const profilePicPreview = document.querySelector('.profile-picture');
    
    if (profilePicInput && profilePicPreview) {
        profilePicInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Confirm delete actions
function confirmDelete(event, itemType) {
    if (!confirm(`Are you sure you want to delete this ${itemType}?`)) {
        event.preventDefault();
        return false;
    }
    return true;
}