// Madness Luxury Hotel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== SMOOTH SCROLLING =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== HERO SLIDER =====
    const heroSlides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        heroSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        heroSlides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    if (heroSlides.length > 0) {
        startSlider();
        
        // Add click events to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
                stopSlider();
                startSlider(); // Restart the auto-slide
            });
        });

        // Pause slider on hover
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', stopSlider);
        heroSection.addEventListener('mouseleave', startSlider);
    }

    // ===== FORM HANDLING =====
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const bookingData = {
                checkin: formData.get('checkin'),
                checkout: formData.get('checkout'),
                guests: formData.get('guests'),
                rooms: formData.get('rooms'),
                name: formData.get('name'),
                email: formData.get('email')
            };

            // Validate dates
            const checkinDate = new Date(bookingData.checkin);
            const checkoutDate = new Date(bookingData.checkout);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (checkinDate < today) {
                alert('Check-in date cannot be in the past.');
                return;
            }

            if (checkoutDate <= checkinDate) {
                alert('Check-out date must be after check-in date.');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('.booking-submit');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Checking Availability...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your booking request! We will contact you shortly to confirm your reservation.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // ===== ANIMATIONS ON SCROLL =====
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.room-card, .restaurant-card, .event-card, .feature-item, .spa-feature');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ===== ROOM CARD INTERACTIONS =====
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== IMAGE LAZY LOADING =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                img.onload = function() {
                    this.style.opacity = '1';
                    this.classList.add('loaded');
                };
                
                img.onerror = function() {
                    this.style.opacity = '1';
                    this.classList.add('loaded');
                    console.log('Image failed to load:', this.src);
                };
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ===== FORCE IMAGE LOADING =====
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.onload = function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        };
        
        img.onerror = function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
            console.log('Image failed to load:', this.src);
        };
    });

    // ===== TOUCH GESTURES FOR MOBILE =====
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        // Swipe up to close mobile menu
        if (Math.abs(diff) > swipeThreshold && navMenu && navMenu.classList.contains('active')) {
            if (diff > 0) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    // ===== FORM VALIDATION =====
    const formInputs = document.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 68, 68)') {
                this.style.borderColor = '';
            }
        });
    });

    // ===== BUTTON LOADING STATES =====
    const buttons = document.querySelectorAll('.room-btn, .restaurant-btn, .spa-btn, .booking-submit');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('room-btn') || 
                this.classList.contains('restaurant-btn') || this.classList.contains('spa-btn')) {
                
                const originalText = this.textContent;
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                if (this.type === 'submit') {
                    this.textContent = 'Processing...';
                }
                
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.textContent = originalText;
                }, 2000);
            }
        });
    });

    // ===== WINDOW RESIZE HANDLER =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== SCROLL TO TOP FUNCTIONALITY =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-gold);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('Madness Luxury Hotel website loaded successfully!');
});
