const whatIsIt = () => ({
    componentName: 'what-is-it',
    $el: null,

    get template() {
        return/*html*/`
            <div>COUCOU</div>
        `;
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', 'template');
    }
});