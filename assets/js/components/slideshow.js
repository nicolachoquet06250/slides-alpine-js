const INIT = 1;
const REMOVE = 2;

const items = [
    {
        text: `Sommaire`,
        // image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
        template: '#item-1'
    },
    {
        text: `I - Qu'est ce que c'est ?`,
        image: 'https://images.unsplash.com/photo-1609766857326-18a204c2cf31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        template: '#item-2'
    },
    {
        text: 'II - La création',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80',
        template: '#item-3'
    },
    {
        text: 'III - La syntaxe',
        image: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
        template: '#item-4'
    },
    {
        text: 'IV - Conclusion',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
        template: '#item-5'
    },
];

const slideshow = () => ({
    componentName: 'slide-list',
    $el: null,

    items,

    holding: false,
    firstClickX: 0,
    alreadyLeftScrolled: true,
    velocity: 0,
    rafID: null,

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
            // console.log(this.velocity);
        }
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
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);

        this.items = this.items.map((e, i) => ({...e, id: i}))

        this.events(INIT);

        return () => this.events(REMOVE);
    }
});