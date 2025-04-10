document.addEventListener('DOMContentLoaded', function() {
    // Toggle login form
    const loginToggle = document.querySelector('.btn-toggle-signin');
    const loginSection = document.querySelector('#alaska-box-login');

    if (loginToggle && loginSection) {
        loginToggle.addEventListener('click', function() {
            loginSection.classList.toggle('show');
            loginToggle.classList.toggle('collapsed');
        });
    }

    // Gender selection
    const genderButtons = document.querySelectorAll('.gender-buttons .gender-button');
    
    genderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the parent gender-buttons container
            const container = this.closest('.gender-buttons');
            // Remove active class from all buttons in this container
            container.querySelectorAll('.gender-button').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
            
            // Check if this is a gender or seeking selection
            const isGender = this.hasAttribute('data-gender');
            const value = isGender ? this.getAttribute('data-gender') : this.getAttribute('data-seeking');
            
            // Update the display text
            if (isGender) {
                document.querySelector('.text-gender').textContent = value;
            } else {
                document.querySelector('.text-seeking').textContent = value;
            }
            
            // Update the hidden radio input
            const input = this.querySelector('input[type="radio"]');
            if (input) {
                input.checked = true;
            }
        });
    });

    // Counter animation
    const counter = document.getElementById('counter');
    if (counter) {
        const value = parseInt(counter.getAttribute('data-value'));
        let current = 0;
        const increment = value / 100;
        const duration = 2000; // 2 seconds
        const interval = duration / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                clearInterval(timer);
                current = value;
            }
            counter.innerHTML = `Over <b>${Math.floor(current).toLocaleString()}</b> members`;
        }, interval);
    }

    // Form validation
    const signupForm = document.querySelector('.sign-up-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[name="email"]').value;
            const zipCode = this.querySelector('input[name="postal_code"]').value;
            const country = this.querySelector('select[name="country"]').value;
            
            if (!email || !zipCode || !country) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', {
                email,
                zipCode,
                country,
                gender: document.querySelector('input[name="gender"]:checked').value,
                seeking: document.querySelector('input[name="seeking"]:checked').value
            });
        });
    }

    // Form input focus effects
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Initialize on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Smooth scroll to top
    const scrollTopBtns = document.querySelectorAll('.scroll-top');
    scrollTopBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});

// Handle responsive navigation
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const loginSection = document.querySelector('#alaska-box-login');
    
    if (width >= 768 && loginSection) {
        loginSection.classList.remove('show');
    }
});
