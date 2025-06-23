       // Carousel implementation
        class Carousel {
            constructor(element) {
                this.carousel = element;
                this.cards = Array.from(this.carousel.querySelectorAll('.card'));
                this.currentIndex = 0;
                this.isDragging = false;
                this.startPos = 0;
                this.currentTranslate = 0;
                this.lastTranslate = 0;

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
                this.cards.forEach((card, index) => {
                    card.addEventListener('click', () => {
                        if (card.classList.contains('prev')) {
                            this.prev();
                        } else if (card.classList.contains('next')) {
                            this.next();
                        }
                    });
                });

                // Touch/mouse events for swiping
                this.carousel.addEventListener('touchstart', (e) => this.touchStart(e));
                this.carousel.addEventListener('touchmove', (e) => this.touchMove(e));
                this.carousel.addEventListener('touchend', () => this.touchEnd());

                this.carousel.addEventListener('mousedown', (e) => this.touchStart(e));
                this.carousel.addEventListener('mousemove', (e) => this.touchMove(e));
                this.carousel.addEventListener('mouseup', () => this.touchEnd());
                this.carousel.addEventListener('mouseleave', () => this.touchEnd());

                this.carousel.addEventListener('contextmenu', (e) => e.preventDefault());
            }

            touchStart(e) {
                this.isDragging = true;
                this.startPos = this.getPositionX(e);
                this.carousel.style.cursor = 'grabbing';
            }

            touchMove(e) {
                if (!this.isDragging) return;
                
                const currentPosition = this.getPositionX(e);
                const diff = currentPosition - this.startPos;
                
                if (Math.abs(diff) > 30) {
                    if (diff > 0) {
                        this.prev();
                    } else {
                        this.next();
                    }
                    this.touchEnd();
                }
            }

            touchEnd() {
                this.isDragging = false;
                this.carousel.style.cursor = 'grab';
            }

            getPositionX(e) {
                return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            }
        }

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = new Carousel(document.querySelector('.card-carousel'));
        });