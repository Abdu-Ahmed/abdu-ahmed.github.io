class Carousel {
    constructor(element) {
        this.carousel = element;
        this.cards = Array.from(this.carousel.querySelectorAll('.card'));
        this.currentIndex = 0;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.lastTranslate = 0;
        this.lastTime = 0;
        this.lastPosition = 0;
        this.swipeThreshold = 30; // Keeping the reduced threshold
        this.swipeTimeThreshold = 200; // Keeping the reduced time threshold

        this.init();
        this.addEventListeners();
    }

    init() {
        this.updateCarousel();
    }

    updateCarousel() {
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                card.classList.add('active');
            } else if (index === this.getPrevIndex()) {
                card.classList.add('prev');
            } else if (index === this.getNextIndex()) {
                card.classList.add('next');
            }
        });
    }

    getPrevIndex() {
        return (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    }

    getNextIndex() {
        return (this.currentIndex + 1) % this.cards.length;
    }

    next() {
        this.currentIndex = this.getNextIndex();
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = this.getPrevIndex();
        this.updateCarousel();
    }

    addEventListeners() {
        // Click on prev/next cards
        this.cards.forEach((card) => {
            card.addEventListener('click', () => {
                if (card.classList.contains('prev')) {
                    this.prev();
                } else if (card.classList.contains('next')) {
                    this.next();
                }
            });
        });

        // Touch events
        this.carousel.addEventListener('touchstart', (e) => this.touchStart(e), { passive: true });
        this.carousel.addEventListener('touchmove', (e) => this.touchMove(e), { passive: true });
        this.carousel.addEventListener('touchend', (e) => this.touchEnd(e));

        // Mouse events
        this.carousel.addEventListener('mousedown', (e) => this.touchStart(e));
        this.carousel.addEventListener('mousemove', (e) => this.touchMove(e));
        this.carousel.addEventListener('mouseup', (e) => this.touchEnd(e));
        this.carousel.addEventListener('mouseleave', (e) => this.touchEnd(e));

        this.carousel.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    touchStart(e) {
        this.isDragging = true;
        this.startPos = this.getPositionX(e);
        this.lastPosition = this.startPos;
        this.lastTime = Date.now();
        this.carousel.style.cursor = 'grabbing';
    }

    touchMove(e) {
        if (!this.isDragging) return;
        
        const currentPosition = this.getPositionX(e);
        const currentTime = Date.now();
        const timeDiff = currentTime - this.lastTime;
        const movement = currentPosition - this.lastPosition;
        
        // Calculate velocity (pixels per millisecond)
        const velocity = Math.abs(movement / timeDiff);
        
        // Update last position and time
        this.lastPosition = currentPosition;
        this.lastTime = currentTime;
        
        // Total movement from start
        const totalMovement = currentPosition - this.startPos;
        
        // Trigger swipe based on movement distance or velocity
        if (Math.abs(totalMovement) > this.swipeThreshold || velocity > 0.5) {
            if (totalMovement < 0) { // Changed direction logic here
                this.next();
            } else {
                this.prev();
            }
            this.touchEnd(e);
        }
    }

    touchEnd(e) {
        if (!this.isDragging) return;
        
        const endTime = Date.now();
        const totalTime = endTime - this.lastTime;
        const endPosition = this.getPositionX(e);
        const totalMovement = endPosition - this.startPos;
        
        // Check for quick swipes
        if (totalTime < this.swipeTimeThreshold && Math.abs(totalMovement) > (this.swipeThreshold / 2)) {
            if (totalMovement < 0) { // Changed direction logic here
                this.next();
            } else {
                this.prev();
            }
        }
        
        this.isDragging = false;
        this.carousel.style.cursor = 'grab';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel(document.querySelector('.card-carousel'));
});
