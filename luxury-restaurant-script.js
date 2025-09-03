// Luxury Restaurant JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Hero buttons functionality
    const heroButtons = document.querySelectorAll('.hero-actions button');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'View Suites') {
                document.querySelector('#suites').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.textContent === 'Book Stay') {
                document.querySelector('#reservations').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reserve button functionality
    const reserveButtons = document.querySelectorAll('.reserve-btn, .btn-primary');
    reserveButtons.forEach(button => {
        if (button.textContent.includes('Book') || button.textContent.includes('Reserve')) {
            button.addEventListener('click', function() {
                document.querySelector('#reservations').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });

    // Form submission
    const reservationForm = document.querySelector('.reservation-form form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const reservationData = {
                checkin: formData.get('checkin'),
                checkout: formData.get('checkout'),
                guests: formData.get('guests'),
                name: formData.get('name'),
                email: formData.get('email')
            };

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Hotel reservation request submitted successfully! We will contact you shortly to confirm your booking.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Experience items animation
    const experienceItems = document.querySelectorAll('.experience-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    experienceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPlus = finalValue.includes('+');
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                let currentValue = 0;
                const increment = numericValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        target.textContent = isPlus ? numericValue + '+' : numericValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = isPlus ? Math.floor(currentValue) + '+' : Math.floor(currentValue);
                    }
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Hero image static (no parallax)
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = 'none';
    }

    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block !important;
                }
                
                .nav-menu {
                    position: fixed;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.95);
                    flex-direction: column;
                    padding: 2rem;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease;
                }
                
                .nav-menu.active {
                    transform: translateY(0);
                }
                
                .nav-menu .nav-link {
                    padding: 1rem 0;
                    border-bottom: 1px solid #333;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add button to nav
        navContainer.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    };

    // Initialize mobile menu
    createMobileMenu();

    // Form validation
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#333';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 68, 68)') {
                this.style.borderColor = '#333';
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    console.log('Luxury Hotel website loaded successfully!');
});
