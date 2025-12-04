// ===== Form Validation =====
function validateForm(event) {
    event.preventDefault();
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    
    let isValid = true;
    
    // Validate Name
    if (name.value.trim() === '') {
        showError(name, 'Please enter your name');
        isValid = false;
    }
    
    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Subject
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    }
    
    // Validate Message
    if (message.value.trim() === '') {
        showError(message, 'Please enter your message');
        isValid = false;
    }
    
    // If valid, show success message
    if (isValid) {
        showSuccess();
        // Reset form
        document.getElementById('contactForm').reset();
    }
    
    return false;
}

function showError(input, message) {
    input.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-1 small';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function showSuccess() {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        <strong>Success!</strong> Your message has been sent.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert before form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// ===== Dark Mode Toggle =====
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('darkModeIcon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check for saved dark mode preference
function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('darkModeIcon');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Progress Bar Animation =====
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-animate');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
    
    // Smooth scroll
    initSmoothScroll();
    
    // Load dark mode preference
    loadDarkMode();
    
    // Animate progress bars
    animateProgressBars();
    
    // Add dark mode toggle button to navbar
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav && !document.getElementById('darkModeBtn')) {
        const darkModeItem = document.createElement('li');
        darkModeItem.className = 'nav-item';
        darkModeItem.innerHTML = `
            <button class="btn btn-outline-light btn-sm ms-2" id="darkModeBtn">
                <i class="fas fa-moon" id="darkModeIcon"></i>
            </button>
        `;
        navbarNav.appendChild(darkModeItem);
        
        document.getElementById('darkModeBtn').addEventListener('click', toggleDarkMode);
    }
    
    // Add scroll animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-card');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});

// ===== Dark Mode CSS =====
const darkModeCSS = `
    .dark-mode {
        background-color: #121212;
        color: #e0e0e0;
    }
    
    .dark-mode .card {
        background-color: #1e1e1e;
        color: #e0e0e0;
        border: 1px solid #333;
    }
    
    .dark-mode .custom-table {
        background-color: #1e1e1e;
        color: #e0e0e0;
    }
    
    .dark-mode .custom-table th {
        background: linear-gradient(45deg, #4f46e5, #059669);
    }
    
    .dark-mode .form-control,
    .dark-mode .form-select {
        background-color: #2d2d2d;
        color: #e0e0e0;
        border-color: #444;
    }
    
    .dark-mode .list-group-item {
        background-color: #1e1e1e;
        color: #e0e0e0;
        border-color: #333;
    }
    
    .dark-mode .navbar {
        background-color: #1a1a1a !important;
    }
    
    .dark-mode .hero-section {
        background: linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%);
    }
    
    .dark-mode .bg-light {
        background-color: #1e1e1e !important;
    }
`;

// Inject dark mode CSS
const style = document.createElement('style');
style.textContent = darkModeCSS;
document.head.appendChild(style);