const ORANGE = 'orange';
const NORSYS = 'norsys';

const logo = [ORANGE, NORSYS].indexOf(localStorage.getItem('selected_logo')) !== -1 
    ? localStorage.getItem('selected_logo') : ORANGE;
const slide = () => ({
    componentName: 'slide',
    $el: null,

    isSimpleClick: false,
    logo,
    logoSize: '50px',

    get item() {
        return JSON.parse(this.$el.parentElement.getAttribute('data-item'));
    },

    get template() {
        return/*html*/ `
        <img :src="item.logos[logo]" class="logo" style="width: ${this.logoSize}; height: auto; pointer-events: none; position: absolute; right: 10px; top: 10px;">

        <template x-if="item.id !== 0">
            <a href="#" class="previous" @dblclick.prevent="firstSlide()" @click.prevent="previousSlide()"></a>
        </template>

        <template x-if="item.image">
            <img :src="item.image" class="background" />
        </template>

        <div class="slide-body" x-html="item.template"></div>

        <template x-if="item.id < item.nbItems - 1">
            <a href="#" class="next" @dblclick.prevent="lastSlide()" @click.prevent="nextSlide()"></a>
        </template>
        `;
    },

    nextSlide() {
        this.isSimpleClick = true;

        setTimeout(() => {
            if (this.isSimpleClick) {
                document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('slide-next', {
                    detail: {
                        id: this.item.id,
                        nextId: this.item.id + 1
                    }
                }));

                let scrollAmount = 0;
                const slideTimer = setInterval(() => {
                    this.$el.parentElement.parentElement.parentElement.scrollLeft += 10;
                    
                    scrollAmount += 10;
                    if (scrollAmount >= this.$el.offsetWidth + 15) {
                        clearInterval(slideTimer);

                        document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('end-slide'));
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
                document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('slide-previous', {
                    detail: {
                        id: this.item.id,
                        previousId: this.item.id - 1
                    }
                }));

                let scrollAmount = 0;
                const slideTimer = setInterval(() => {
                    this.$el.parentElement.parentElement.parentElement.scrollLeft -= 10;

                    scrollAmount += 10;
                    if (scrollAmount >= this.$el.offsetWidth + 5) {
                        clearInterval(slideTimer);

                        document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('end-slide'));
                    }
                }, 5);

                this.isSimpleClick = false;
            }
        }, 250);
    },

    lastSlide() {
        document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('slide-next', {
            detail: {
                id: this.item.id,
                nextId: items.length - 1
            }
        }));

        this.isSimpleClick = false;

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            this.$el.parentElement.parentElement.parentElement.scrollLeft += 10;

            scrollAmount += 10;
            if (scrollAmount >= Math.max(Array.from(this.$el.parentElement.parentElement.querySelectorAll('section')).reduce((r, c) => r + c.offsetWidth + 5, this.$el.scrollLeft), 0)) {
                clearInterval(slideTimer);

                document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('end-slide'));
            }
        }, 5);
    },

    firstSlide() {
        document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('slide-previous', {
            detail: {
                id: this.item.id,
                previousId: 0
            }
        }));

        this.isSimpleClick = false;

        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            this.$el.parentElement.parentElement.parentElement.scrollLeft -= 10;

            scrollAmount += 10;
            if (scrollAmount >= Math.max(Array.from(this.$el.parentElement.parentElement.querySelectorAll('section')).reduce((r, c) => r + c.offsetWidth + 5, this.$el.scrollLeft), 0)) {
                clearInterval(slideTimer);

                document.querySelector('[data-component=slide-list]').dispatchEvent(new CustomEvent('end-slide'));
            }
        }, 5);
    },

    resizeSlide() {
        this.$el.parentElement.style.setProperty('--screen-width', window.innerWidth - 5 + 'px');

        const backgroundImage = this.$el.querySelector('img.background');

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