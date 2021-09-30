const sommaire = () => ({
    componentName: 'sommaire',
    $el: null,

    message: 'coucou je suis dans le sommaire',

    stepList: [
        {
            title: `Qu'est ce que c'est ?`,
            element: 'slide-1'
        },
        {
            title: `La création`,
            element: 'slide-2'
        },
        {
            title: `La syntaxe`,
            element: 'slide-3'
        },
        {
            title: `Conclusion`,
            element: 'slide-4'
        }
    ],

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

    handleClick(e) {
        const target = e.target;
        const id = Number(target.getAttribute('data-element').replace('slide-', ''));
        const element = document.querySelector(`#${target.getAttribute('data-element')}`);
        const slideWidth = element.offsetWidth;

        console.log((id * slideWidth - this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft), id, slideWidth, this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft)

        // this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft = (id * slideWidth - this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft) + id * 15;

        /*this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollTo({
            top: 0,
            left: (id * slideWidth - this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft) + id * 15,
            behavior: 'smooth'
        });*/

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft += 10;
            
            scrollAmount += 0.005;
            if (scrollAmount > ((id * slideWidth - this.$el.parentElement.parentElement.parentElement.parentElement.parentElement.scrollLeft) * 2) + id * 20) {
                clearInterval(slideTimer);
            }
        }, 1);
    },

    get template() {
        return/*html*/`
            <div class="card">
                <ol>
                    <template x-for="step of stepList">
                        <li>
                            <a href="#" x-text="step.title" :data-element="step.element"
                               @mouseover="handleMouseOver($event)" 
                               @mouseout="handleMouseOut($event)"
                               @click.prevent.stop="handleClick($event)"></a>
                        </li>
                    </template>
                </ol>
            </div>
        `
    },

    init() {
        this.$el.setAttribute('x-html', 'template');
        this.$el.setAttribute('data-component', this.componentName);
    }
});