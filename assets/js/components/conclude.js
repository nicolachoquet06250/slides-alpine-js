const conclude = () => ({
    componentName: 'conclude',

    logo: 'https://avatars.githubusercontent.com/u/59030169?s=280&v=4',

    list: [
        'Micro-Framework très léger',

        'Travaille uniquement avec le DOM',

        'API côté HTML similaire à Vue.js',

        `Adapté pour du 
        <span @click="markWord('SSR')">
            <span x-data="underline_animation()" x-init="init()">
                SSR
            </span>

            <sup> (1) </sup>
        </span>`
    ],

    marked: '',

    markWord(word) {
        this.marked = word;

        setTimeout(() => {
            this.marked = '';
        }, 2000);
    },

    get template() {
        return/*html*/`
            <div>
                <div>
                    <img :src="logo" />
                </div>

                <div>
                    <ul class="list">
                        <template x-for="item of list">
                            <li x-html="item"> Micro-Framework très léger </li>
                        </template>
                    </ul>
                </div>
            </div>

            <footer>
                <h3>Légende</h3>
                <div>
                    <template x-if="marked === 'SSR'">
                        <mark>
                            <dt>(1)</dt>: <dd>Server Side Rendering</dd>
                        </mark>
                    </template>
                    
                    <template x-if="marked !== 'SSR'">
                        <span>
                            <dt>(1)</dt>: <dd>Server Side Rendering</dd>
                        </span>
                    </template>
                </div>
            </footer>
        `;
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', 'template');
    }
});