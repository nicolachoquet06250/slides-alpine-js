const whatIsIt = () => ({
    componentName: 'what-is-it',
    $el: null,

    text: '<span>coucou</span>',
    tableau: [
        'test',
        'test 1'
    ],

    get template() {
        return/*html*/`
            <div x-text="text.toUpperCase()"></div>

            <template x-for="label of tableau">
                <span x-text="label"></span>
            </template>
        `;
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', 'template');
    }
});