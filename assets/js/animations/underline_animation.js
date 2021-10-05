const underline_animation = () => ({
    componentName: 'underline-animation',
    $el: null,

    handleMouseOver(e) {
        const target = e.target;
        target.classList.remove('mouseout');
        target.classList.add('mouseover');
    },

    handleMouseOut(e) {
        const target = e.target;
        target.classList.remove('mouseover');
        target.classList.add('mouseout');
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.addEventListener('mouseover', this.handleMouseOver.bind(this));
        this.$el.addEventListener('mouseout', this.handleMouseOut.bind(this));

        if (this.$el.parentElement.getAttribute('data-text')) {
            this.$el.innerText = this.$el.parentElement.getAttribute('data-text');
        }
        
        if (this.$el.parentElement.getAttribute('data-html')) {
            this.$el.innerHTML = this.$el.parentElement.getAttribute('data-html');
        }
    }
});