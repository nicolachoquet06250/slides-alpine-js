const sommaire = () => ({
    componentName: 'sommaire',
    $el: null,

    stepList: items,

    get template() {
        return/*html*/`
            <div class="card">
                <ol class="list">
                    <template x-for="step of stepList">
                        <li>
                            <a href="#" :data-text="step.text" :data-element="step.element"
                               @click.prevent.stop="handleClick($event)">
                                <span x-data="underline_animation()" x-init="init()"></span>
                            </a>
                        </li>
                    </template>
                </ol>
            </div>
        `
    },

    handleClick(e) {
        const target = e.target.parentElement;
        const id = Number(target.getAttribute('data-element').replace('slide-', ''));
        const element = document.querySelector(`#${target.getAttribute('data-element')}`);
        const slideWidth = element.offsetWidth;

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft += 10;
            
            scrollAmount += 0.005;
            if (scrollAmount > ((id * slideWidth - this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft) * 2) + id * 20) {
                clearInterval(slideTimer);
            }
        }, 1);
    },

    init() {
        this.$el.setAttribute('x-html', 'template');
        this.$el.setAttribute('data-component', this.componentName);
    }
});