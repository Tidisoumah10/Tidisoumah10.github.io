// Projects Carousel functionality
class ProjectsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 2; // We have 2 slides (2 projects each)
        this.isAnimating = false;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateCarousel();
    }
    
    initializeElements() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        this.indicators = document.querySelectorAll('.indicator');
        this.slides = document.querySelectorAll('.carousel-slide');
    }
    
    attachEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Auto-play (optional)
        this.startAutoPlay();
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
    
    startAutoPlay() {
        // Auto-advance every 8 seconds
        setInterval(() => {
            if (!this.isAnimating) {
                this.nextSlide();
            }
        }, 8000);
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    previousSlide() {
        if (this.isAnimating) return;
        
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }
    
    goToSlide(slideIndex) {
        if (this.isAnimating || slideIndex === this.currentSlide) return;
        
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isAnimating = true;
        
        // Update track position
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update navigation buttons state
        this.updateNavigationButtons();
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    updateNavigationButtons() {
        // For infinite carousel, always show both buttons
        // But you can customize this behavior if needed
        this.prevBtn.style.opacity = '1';
        this.nextBtn.style.opacity = '1';
    }
    
    // Public method to get current slide info
    getCurrentSlide() {
        return {
            current: this.currentSlide,
            total: this.totalSlides
        };
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if carousel elements exist before initializing
    if (document.getElementById('carouselTrack')) {
        new ProjectsCarousel();
    }
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';
