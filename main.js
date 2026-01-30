// Main JavaScript for Doctororians Guide

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Doctororians Guide loaded successfully!');
    
    // Initialize modal functionality
    initModal();
    
    // Initialize subject buttons
    initSubjectButtons();
    
    // Display welcome message
    showWelcomeMessage();
});

// Modal functionality
function initModal() {
    const modal = document.getElementById('accountModal');
    const btn = document.getElementById('accountBtn');
    const closeBtn = document.querySelector('.close');
    
    if (btn && modal) {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Subject Quiz Buttons
function initSubjectButtons() {
    const subjectBtns = document.querySelectorAll('.subject-btn');
    subjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const subject = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            startSubjectQuiz(subject);
        });
    });
}

function startSubjectQuiz(subject) {
    const subjects = {
        biology: { name: 'Biology', count: 210 },
        chemistry: { name: 'Chemistry', count: 180 },
        physics: { name: 'Physics', count: 150 },
        english: { name: 'English', count: 60 }
    };
    
    const sub = subjects[subject];
    if (sub) {
        // Redirect to quiz page with subject parameter
        window.location.href = `quiz.html?subject=${subject}`;
        
        // Alternatively, show a confirmation message
        // alert(`Starting ${sub.name} Quiz with ${sub.count} questions!`);
    }
}

// Welcome message
function showWelcomeMessage() {
    const welcomeTime = new Date().getHours();
    let message = '';
    
    if (welcomeTime < 12) message = 'Good Morning, Future Doctor! ☀️';
    else if (welcomeTime < 18) message = 'Good Afternoon, Keep Shining! 🌤️';
    else message = 'Good Evening, Study Smart! 🌙';
    
    // Optional: Uncomment to show toast notification
    // showToast(message);
    
    console.log(message);
}

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-bell"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Form submission handler
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        password: this.querySelector('input[type="password"]').value,
        year: this.querySelector('select').value
    };
    
    // In a real app, you would send this to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Account created successfully! Check your email for verification.');
    
    // Close modal
    document.getElementById('accountModal').style.display = 'none';
    
    // Clear form
    this.reset();
});

// Page visit counter (local storage based)
function updateVisitCount() {
    let visits = localStorage.getItem('doctororiansVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('doctororiansVisits', visits);
    
    console.log(`Welcome! This is your visit #${visits} to Doctororians Guide`);
    
    // Optional: Show on 10th visit
    if (visits === 10) {
        showToast('🎉 Welcome back for the 10th time! Keep going!');
    }
}

// Call on page load
updateVisitCount();
