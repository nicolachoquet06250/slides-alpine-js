const slideshow = () => ({
    componentName: 'slide-list',
    $el: null,

    items: [
        {
            text: 'Item 1',
            image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
        },
        {
            text: 'Item 2',
            image: 'https://images.unsplash.com/photo-1609766857326-18a204c2cf31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        },
        {
            text: 'Item 3',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80'
        },
        {
            text: 'Item 4',
            image: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80'
        },
        {
            text: 'Item 5',
            image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
        },
    ],

    holding: false,
    firstClickX: 0,
    alreadyLeftScrolled: true,
    velocity: 0,
    rafID: null,

    isSimpleClick: false,

    handleMouseDown(e) {
        this.holding = true;
        this.firstClickX = e.pageX - this.$el.offsetLeft;
        this.alreadyLeftScrolled = this.$el.scrollLeft;
        this.stopTransition()
    },

    handleMouseMove(e) {
        if (!this.holding) return;

        const x = e.pageX - this.$el.offsetLeft;
        const scrolled = (x - this.firstClickX) * 2;
        const prevScrollLeft = this.$el.scrollLeft;

        this.$el.scrollLeft = this.alreadyLeftScrolled - scrolled;
        this.velocity = this.$el.scrollLeft - prevScrollLeft;
    },

    handleMouseUp() {
        this.holding = false;
        this.startTransition()
    },

    handleMouseLeave() {
        this.holding = false;
    },

    handleToucheStart(e) {
        this.holding = true;
        // pageX => la largeur entre mon click et le DOCUMENT
        this.firstClickX = e.targetTouches[0].pageX - this.$el.offsetLeft;
        this.alreadyLeftScrolled = this.$el.scrollLeft;
        this.stopTransition();
    },

    handleToucheEnd() {
        this.holding = false;
        this.startTransition()
    },

    handleToucheMove(e) {
        if(!this.holding) return;

        const x = e.targetTouches[0].pageX - this.$el.offsetLeft;
        const scrolled = (x - this.firstClickX) * 2;
        const prevScrollLeft = this.$el.scrollLeft;

        this.$el.scrollLeft = this.alreadyLeftScrolled - scrolled;
        this.velocity = this.$el.scrollLeft - prevScrollLeft;
    },

    startTransition() {
        this.stopTransition();
        this.rafID = requestAnimationFrame(this.decreasingTransition.bind(this));
    },

    stopTransition() {
        cancelAnimationFrame(this.rafID)
    },

    decreasingTransition() {
        this.$el.scrollLeft += this.velocity;
        this.velocity *= 0.95;

        if (Math.abs(this.velocity) > 0.5) {
            this.rafID = requestAnimationFrame(this.decreasingTransition.bind(this))
            console.log(this.velocity);
        }
    },

    nextSlide() {
        this.isSimpleClick = true;

        setTimeout(() => {
            if (this.isSimpleClick) {
                let scrollAmount = 0;
                const slideTimer = setInterval(() => {
                    this.$el.scrollLeft += 10;
                    scrollAmount += 10;
                    if (scrollAmount >= this.$el.querySelector('section').offsetWidth + 5) {
                        clearInterval(slideTimer);
                    }
                }, 5);

                this.isSimpleClick = false;
            }
        }, 250);
    },

    previousSlide() {
        this.isSimpleClick = true;

        setTimeout(() => {
            if (this.isSimpleClick) {
                let scrollAmount = 0;
                const slideTimer = setInterval(() => {
                    this.$el.scrollLeft -= 10;
                    scrollAmount += 10;
                    if (scrollAmount >= this.$el.querySelector('section').offsetWidth + 5) {
                        clearInterval(slideTimer);
                    }
                }, 5);

                this.isSimpleClick = false;
            }
        }, 250);
    },

    lastSlide() {
        this.isSimpleClick = false;

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            this.$el.scrollLeft += 10;
            scrollAmount += 10;
            if (scrollAmount >= Math.max(Array.from(this.$el.querySelectorAll('section')).reduce((r, c) => r + c.offsetWidth + 5, this.$el.scrollLeft), 0)) {
                clearInterval(slideTimer);
            }
        }, 5);
    },

    firstSlide() {
        this.isSimpleClick = false;

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            this.$el.scrollLeft -= 10;
            scrollAmount += 10;
            if (scrollAmount >= Math.max(Array.from(this.$el.querySelectorAll('section')).reduce((r, c) => r + c.offsetWidth + 5, this.$el.scrollLeft), 0)) {
                clearInterval(slideTimer);
            }
        }, 5);
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);

        this.items = this.items.map((e, i) => ({...e, id: i}))

        this.$el.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.$el.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.$el.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.$el.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.$el.addEventListener('touchstart', this.handleToucheStart.bind(this));
        this.$el.addEventListener('touchend', this.handleToucheEnd.bind(this));
        this.$el.addEventListener('touchmove', this.handleToucheMove.bind(this));

        return () => {
            this.$el.removeEventListener('mousedown', this.handleMouseDown.bind(this));
            this.$el.removeEventListener('mouseup', this.handleMouseUp.bind(this));
            this.$el.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            this.$el.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
            this.$el.removeEventListener('touchstart', this.handleToucheStart.bind(this));
            this.$el.removeEventListener('touchend', this.handleToucheEnd.bind(this));
            this.$el.removeEventListener('touchmove', this.handleToucheMove.bind(this));
        };
    }
});