const slide = () => ({
    componentName: 'slide',
    $el: null,

    isSimpleClick: false,

    get item() {
        return JSON.parse(this.$el.parentElement.getAttribute('data-item'));
    },

    get template() {
        return/*html*/ `
        <template x-if="item.id !== 0">
            <a href="#" class="previous" @dblclick.prevent="firstSlide()" @click.prevent="previousSlide()"></a>
        </template>

        <template x-if="item.image">
            <img :src="item.image" />
        </template>

        <div class="slide-body" x-html="document.querySelector(item.template).innerHTML"></div>

        <template x-if="item.id < item.nbItems - 1">
            <a href="#" class="next" @dblclick.prevent="lastSlide()" @click.prevent="nextSlide()"></a>
        </template>
        `;
    },

    nextSlide() {
        this.isSimpleClick = true;

        setTimeout(() => {
            if (this.isSimpleClick) {
                let scrollAmount = 0;
                const slideTimer = setInterval(() => {
                    this.$el.parentElement.parentElement.parentElement.scrollLeft += 10;
                    
                    scrollAmount += 10;
                    if (scrollAmount >= this.$el.offsetWidth + 15) {
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
                    this.$el.parentElement.parentElement.parentElement.scrollLeft -= 10;

                    scrollAmount += 10;
                    if (scrollAmount >= this.$el.offsetWidth + 5) {
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
            this.$el.parentElement.parentElement.parentElement.scrollLeft += 10;

            scrollAmount += 10;
            if (scrollAmount >= Math.max(Array.from(this.$el.parentElement.parentElement.querySelectorAll('section')).reduce((r, c) => r + c.offsetWidth + 5, this.$el.scrollLeft), 0)) {
                clearInterval(slideTimer);
            }
        }, 5);
    },

    firstSlide() {
        this.isSimpleClick = false;

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            this.$el.parentElement.parentElement.parentElement.scrollLeft -= 10;

            scrollAmount += 10;
            if (scrollAmount >= Math.max(Array.from(this.$el.parentElement.parentElement.querySelectorAll('section')).reduce((r, c) => r + c.offsetWidth + 5, this.$el.scrollLeft), 0)) {
                clearInterval(slideTimer);
            }
        }, 5);
    },

    resizeSlide() {
        this.$el.parentElement.style.setProperty('--screen-width', window.innerWidth - 5 + 'px');

        const backgroundImage = this.$el.querySelector('img');

        if (backgroundImage) {
            if (window.innerWidth < 842) {
                backgroundImage.style.setProperty('--mt', ((this.$el.parentElement.offsetHeight - this.$el.querySelector('img').offsetHeight) / 2) + 'px');
            } else {
                backgroundImage.style.setProperty('--mt', '0px');
            }
        }
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('id', `slide-${this.item.id}`);
        this.$el.setAttribute('x-html', 'template');

        setTimeout(this.resizeSlide.bind(this), 100);

        window.addEventListener('resize', this.resizeSlide.bind(this));

        return () => {
            window.removeEventListener('resize', this.resizeSlide.bind(this));
        }
    }
});