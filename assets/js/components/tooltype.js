const tooltype = options => ({
    componentName: 'tooltype',
    $el: null,
    options,

    mouseOverHandler(e) {
        this.$el.style.position = 'relative';
        if (!this.$el.querySelector(`[data-component="${this.componentName}"]`)) {
            for (const option of this.options) {
                this.$el.innerHTML +=/*html*/`
                    <div data-component="${this.componentName}" class="${option.sens}">
                        ${option.text}
                    </div>
                `;
            }
        }
    },

    mouseOutHandler(e) {
        this.$el.style.position = 'unset';
        for (const option of this.options) {
            if ((_tooltype = this.$el.querySelector(`[data-component="${this.componentName}"].${option.sens}`))) {
                _tooltype.remove();
            }
        }
    },
    
    init() {
        if (this.$el.parentElement.getAttribute('data-text') && this.$el.innerHTML === '') {
            this.$el.innerHTML = this.$el.parentElement.getAttribute('data-text');
        }

        if ((this.options || []).length === 0) {
            if (this.$el.parentElement.getAttribute('data-tooltypes')) {
                this.options = JSON.parse(this.$el.parentElement.getAttribute('data-tooltypes'));
            } else {
                this.options = [];
            }
        }

        this.$el.setAttribute('x-on:mouseover', 'mouseOverHandler($event)');
        this.$el.setAttribute('x-on:mouseout', 'mouseOutHandler($event)');
    }
});