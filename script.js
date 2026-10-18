// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// Contact Form Backend Integration
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]')?.value.trim();
        const email = contactForm.querySelector('input[type="email"]')?.value.trim();
        const message = contactForm.querySelector('textarea')?.value.trim();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (!name || !email || !message || !submitBtn) {
            alert('Please complete all contact form fields.');
            return;
        }

        const originalButtonText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert('Thank you for reaching out! Your message has been sent to Eatasam.');
                contactForm.reset();
            } else {
                alert(`Error: ${result.error || 'Your message could not be sent.'}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to connect to the server. Make sure the backend is running.');
        } finally {
            submitBtn.textContent = originalButtonText;
            submitBtn.disabled = false;
        }
    });
}
