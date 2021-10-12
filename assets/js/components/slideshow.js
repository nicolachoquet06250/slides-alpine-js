const INIT = 1;
const REMOVE = 2;

const logos = {
    orange: 'https://startup.orange.com/wp-content/uploads/sites/7/2019/03/small_logo_rgb.png',
    norsys: 'https://avatars.githubusercontent.com/u/2487851?s=200&v=4'
};

const slideshow = () => ({
    componentName: 'slide-list',
    $el: null,

    items,
    logos,

    holding: false,
    firstClickX: 0,
    alreadyLeftScrolled: true,
    velocity: 0,
    rafID: null,
    isSlideDisabled: false,

    handleMouseDown(e) {
        if (this.isSlideDisabled) return;

        this.holding = true;
        this.firstClickX = e.pageX - this.$el.offsetLeft;
        this.alreadyLeftScrolled = this.$el.scrollLeft;
        this.stopTransition()
    },

    handleMouseMove(e) {
        if (this.isSlideDisabled) return;

        if (!this.holding) return;

        const x = e.pageX - this.$el.offsetLeft;
        const scrolled = (x - this.firstClickX) * 2;
        const prevScrollLeft = this.$el.scrollLeft;

        this.$el.scrollLeft = this.alreadyLeftScrolled - scrolled;
        this.velocity = this.$el.scrollLeft - prevScrollLeft;
    },

    handleMouseUp() {
        if (this.isSlideDisabled) return;

        this.holding = false;
        this.startTransition()
    },

    handleMouseLeave() {
        if (this.isSlideDisabled) return;

        this.holding = false;
    },

    handleToucheStart(e) {
        if (this.isSlideDisabled) return;

        this.holding = true;
        // pageX => la largeur entre mon click et le DOCUMENT
        this.firstClickX = e.targetTouches[0].pageX - this.$el.offsetLeft;
        this.alreadyLeftScrolled = this.$el.scrollLeft;
        this.stopTransition();
    },

    handleToucheEnd() {
        if (this.isSlideDisabled) return;

        this.holding = false;
        this.startTransition()
    },

    handleToucheMove(e) {
        if (this.isSlideDisabled) return;

        if(!this.holding) return;

        const x = e.targetTouches[0].pageX - this.$el.offsetLeft;
        const scrolled = (x - this.firstClickX) * 2;
        const prevScrollLeft = this.$el.scrollLeft;

        this.$el.scrollLeft = this.alreadyLeftScrolled - scrolled;
        this.velocity = this.$el.scrollLeft - prevScrollLeft;
    },

    startTransition() {
        if (this.isSlideDisabled) return;

        this.stopTransition();
        this.rafID = requestAnimationFrame(this.decreasingTransition.bind(this));
    },

    stopTransition() {
        if (this.isSlideDisabled) return;

        cancelAnimationFrame(this.rafID)
    },

    decreasingTransition() {
        if (this.isSlideDisabled) return;

        this.$el.scrollLeft += this.velocity;
        this.velocity *= 0.95;

        if (Math.abs(this.velocity) > 0.5) {
            this.rafID = requestAnimationFrame(this.decreasingTransition.bind(this))
            // console.log(this.velocity);
        }
    },

    disableSlides() {
        this.isSlideDisabled = true;
    },

    enableSlides() {
        this.isSlideDisabled = false;
    },

    /**
     * @param {INIT|REMOVE} type 
     */
    events(type) {
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('mousedown', this.handleMouseDown.bind(this));
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('mouseup', this.handleMouseUp.bind(this));
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('mousemove', this.handleMouseMove.bind(this));
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('mouseleave', this.handleMouseLeave.bind(this));
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('touchstart', this.handleToucheStart.bind(this));
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('touchend', this.handleToucheEnd.bind(this));
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('touchmove', this.handleToucheMove.bind(this));
        
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('disable-slide', this.disableSlides.bind(this));
        this.$el[`${type === INIT ? 'add' : 'remove'}EventListener`]('enable-slide', this.enableSlides.bind(this));
    },

    init() {;
        this.$el.setAttribute('data-component', this.componentName);

        this.items = this.items.map((e, i) => ({...e, id: i}))

        this.events(INIT);

        const ORANGE = 'orange';
        const NORSYS = 'norsys';

        const logo = [ORANGE, NORSYS].indexOf(localStorage.getItem('selected_logo')) !== -1 
            ? localStorage.getItem('selected_logo') : ORANGE;

        document.head.innerHTML +=/*html*/`
            <link rel="icon" href="${logos[logo]}" />
        `;

        return () => this.events(REMOVE);
    }
});