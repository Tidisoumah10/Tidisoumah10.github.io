// ===== PORTFOLIO PORTFOLIO - MAIN SCRIPT =====
// Web Developer & Shopify Expert Portfolio
// Features: 3D Text Effects, Modern Animations, Scroll Triggers, Interactive Elements

// ===== GLOBAL VARIABLES =====
let isScrolling = false;
let scrollTimeout;
let currentSection = 'home';

// ===== DOM ELEMENTS =====
const loadingScreen = document.querySelector('.loading-screen');
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// ===== MAIN INITIALIZATION FUNCTION =====
function initializePortfolio() {
    // Hide loading screen after content loads
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeNewsletter();
    initializeBackToTop();
    initializeParallaxEffects();
    initialize3DEffects();
    
    // Add scroll event listeners
    window.addEventListener('scroll', handleScroll);
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
}

// ===== LOADING SCREEN ANIMATION =====
function animateLoadingScreen() {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-logo .logo-text');
    
    // Animate loading bar
    gsap.to(loadingProgress, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
    });
    
    // Animate logo text
    gsap.fromTo(loadingText, 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
    );
}

// ===== NAVIGATION SYSTEM =====
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        gsap.to(spans[0], { rotate: 45, y: 6, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.3 });
        gsap.to(spans[2], { rotate: -45, y: -6, duration: 0.3 });
    } else {
        gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
    }
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    
    const spans = navToggle.querySelectorAll('span');
    gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, duration: 0.3 });
    gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        // Close mobile menu if open
        closeMobileMenu();
        
        // Smooth scroll to section with offset for navbar
        const navbarHeight = 80;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== SCROLL EFFECTS & NAVIGATION HIGHLIGHTING =====
function initializeScrollEffects() {
    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function handleScroll() {
    if (!isScrolling) {
        isScrolling = true;
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Clear timeout
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }
}

// ===== ANIMATIONS & GSAP EFFECTS =====
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // Hero section animations
    animateHeroSection();
    
    // Floating elements animation
    animateFloatingElements();
    
    // Text reveal animations
    initializeTextReveals();
    
    // Parallax effects
    initializeParallaxEffects();
}

function animateHeroSection() {
    const tl = gsap.timeline();
    
    // Animate hero title lines
    tl.from('.title-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-cta', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.floating-element', {
        scale: 0,
        rotation: 180,
        duration: 1.5,
        stagger: 0.3,
        ease: 'back.out(1.7)'
    }, '-=0.5');
}

function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        gsap.to(element, {
            y: -30,
            rotation: 360,
            duration: 4 + index,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.5
        });
    });
}

function initializeTextReveals() {
    // 3D text hover effects
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach(line => {
        line.addEventListener('mouseenter', () => {
            gsap.to(line, {
                duration: 0.3,
                scale: 1.05,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
        
        line.addEventListener('mouseleave', () => {
            gsap.to(line, {
                duration: 0.3,
                scale: 1,
                rotationX: 15,
                ease: 'power2.out'
            });
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    // Hero background parallax
    gsap.to('.hero-grid', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        gsap.to(element, {
            y: -100 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// ===== 3D EFFECTS =====
function initialize3DEffects() {
    // 3D tilt effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(card, {
                duration: 0.3,
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                rotationX: 0,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });
    
    // 3D hover effect for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(item, {
                duration: 0.3,
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                rotationX: 0,
                rotationY: 0,
                ease: 'power2.out'
            });
        });
    });
}

// ===== CONTACT FORM HANDLING =====
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Form input animations
        const formInputs = document.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });
    }
}

function handleInputFocus(e) {
    const label = e.target.nextElementSibling;
    gsap.to(label, {
        duration: 0.3,
        y: -20,
        scale: 0.9,
        color: '#000',
        ease: 'power2.out'
    });
}

function handleInputBlur(e) {
    const label = e.target.nextElementSibling;
    if (!e.target.value) {
        gsap.to(label, {
            duration: 0.3,
            y: 0,
            scale: 1,
            color: '#666',
            ease: 'power2.out'
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset labels
        const labels = contactForm.querySelectorAll('.form-label');
        labels.forEach(label => {
            gsap.to(label, {
                duration: 0.3,
                y: 0,
                scale: 1,
                color: '#666',
                ease: 'power2.out'
            });
        });
    }, 2000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    gsap.to(notification, {
        duration: 0.5,
        x: 0,
        ease: 'power2.out'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        gsap.to(notification, {
            duration: 0.5,
            x: 400,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, 5000);
}

// ===== BACK TO TOP FUNCTIONALITY =====
function initializeBackToTop() {
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== SCROLL TRIGGER ANIMATIONS =====
function initializeScrollTriggers() {
    // Section reveal animations
    sections.forEach((section, index) => {
        const sectionTitle = section.querySelector('.section-title');
        const sectionContent = section.querySelectorAll('.section-subtitle, .about-content, .services-grid, .portfolio-grid, .contact-content');
        
        if (sectionTitle) {
            gsap.fromTo(sectionTitle, 
                { y: 100, opacity: 0, rotationX: 90 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
        
        if (sectionContent.length > 0) {
            gsap.fromTo(sectionContent, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        end: 'bottom 30%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const obj = { value: 0 };
        
        gsap.to(obj, {
            value: finalValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            onUpdate: () => {
                stat.textContent = Math.ceil(obj.value) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
            }
        });
    });
}

// ===== RESPONSIVE HANDLING =====
function handleResize() {
    // Recalculate scroll triggers on resize
    ScrollTrigger.refresh();
    
    // Close mobile menu on resize if screen becomes large
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add keyboard navigation for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View project details');
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #000';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// ===== ERROR HANDLING =====
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
        showNotification('An error occurred. Please reload the page.', 'error');
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        showNotification('An error occurred. Please reload the page.', 'error');
    });
}

// ===== ANALYTICS & TRACKING =====
function trackUserInteractions() {
    // Track section views
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                console.log(`Section viewed: ${sectionId}`);
                // Add your analytics tracking here
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Track form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            console.log('Contact form submitted');
            // Add your analytics tracking here
        });
    }
    
    // Track portfolio clicks
    const portfolioLinks = document.querySelectorAll('.project-link');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', () => {
            const projectName = link.closest('.portfolio-item').querySelector('.project-title').textContent;
            console.log(`Portfolio project clicked: ${projectName}`);
            // Add your analytics tracking here
        });
    });
}

// ===== FINAL INITIALIZATION =====
// Wait for all resources to load
window.addEventListener('load', () => {
    // Initialize remaining features
    initializeScrollTriggers();
    optimizePerformance();
    enhanceAccessibility();
    handleErrors();
    trackUserInteractions();
    
    // Final animation sequence
    gsap.to('.hero-content', {
        duration: 1,
        opacity: 1,
        ease: 'power2.out'
    });
    
    console.log('🎨 Portfolio Portfolio completamente caricato e funzionante!');
});

// ===== NEWSLETTER FUNCTIONALITY =====
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter a valid email', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Invalid email format', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('.newsletter-btn');
    const originalIcon = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Subscription completed! Thank you for subscribing.', 'success');
        emailInput.value = '';
        
        // Reset button
        submitBtn.innerHTML = originalIcon;
        submitBtn.disabled = false;
    }, 1500);
}

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.PortfolioPortfolio = {
    showNotification,
    scrollToSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = 80;
            const targetPosition = section.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    refreshAnimations: () => {
        ScrollTrigger.refresh();
        AOS.refresh();
    }
};

