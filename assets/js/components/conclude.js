const conclude = () => ({
    componentName: 'conclude',

    logo: 'https://avatars.githubusercontent.com/u/59030169?s=280&v=4',

    get template() {
        return/*html*/`
            <div>
                <img :src="logo" />
            </div>

            <div>
                <ul class="list">
                    <li> Micro-Framework très léger </li>

                    <li> Travail uniquement avec le DOM </li>

                    <li> API côté HTML symilaire à Vue.js </li>

                    <li> Adapté pour du SSR<sup>(1)</sup> </li>
                </ul>
            </div>
        `;
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', 'template');
    }
});