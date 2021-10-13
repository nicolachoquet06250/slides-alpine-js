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

    events() {
        this.$el.setAttribute('x-on:slide-next', 'slideNext($event)');
        this.$el.setAttribute('x-on:slide-previous', 'slidePrevious($event)');
        this.$el.setAttribute('x-on:end-slide', 'endSlide($event)');
        this.$el.setAttribute('x-on:disable-slide', 'disableSlides($event)');
        this.$el.setAttribute('x-on:enable-slide', 'enableSlides($event)');
        this.$el.setAttribute('x-on:mousedown', 'handleMouseDown($event)');
        this.$el.setAttribute('x-on:mouseup', 'handleMouseUp($event)');
        this.$el.setAttribute('x-on:mousemove', 'handleMouseMove($event)');
        this.$el.setAttribute('x-on:mouseleave', 'handleMouseLeave($event)');
        this.$el.setAttribute('x-on:touchstart', 'handleToucheStart($event)');
        this.$el.setAttribute('x-on:touchend', 'handleToucheEnd($event)');
        this.$el.setAttribute('x-on:touchmove', 'handleToucheMove($event)');
    },

    slideNext({ detail: { id, nextId } }) {
        this.$el.querySelector(`#slide-${id}`).classList.add('is-current');
        this.$el.querySelector(`#slide-${nextId}`).classList.add('is-next');
        this.$el.querySelector('.current')?.classList.remove('current');
    },

    slidePrevious({ detail: { id, previousId } }) {
        this.$el.querySelector(`#slide-${id}`).classList.add('is-current');
        this.$el.querySelector(`#slide-${previousId}`).classList.add('is-previous');
        this.$el.querySelector('.current')?.classList.remove('current');
    },

    endSlide() {
        this.$el.querySelector('.is-next')?.classList.add('current');
        this.$el.querySelector('.is-previous')?.classList.add('current');

        this.$el.querySelector('.is-current')?.classList.remove('is-current');
        this.$el.querySelector('.is-next')?.classList.remove('is-next');
        this.$el.querySelector('.is-previous')?.classList.remove('is-previous');
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);

        this.events();

        const ORANGE = 'orange';
        const NORSYS = 'norsys';

        const logo = [ORANGE, NORSYS].indexOf(localStorage.getItem('selected_logo')) !== -1 
            ? localStorage.getItem('selected_logo') : ORANGE;

        document.head.innerHTML +=/*html*/`
            <link rel="icon" href="${logos[logo]}" />
        `;
    }
});