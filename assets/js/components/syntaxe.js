const PART_1 = 0;
const PART_2 = 1;
const PART_3 = 2;
const PART_4 = 4;
const PART_5 = 5;

const syntaxe = (part = PART_1) => ({
    componentName: 'syntaxe',
    $el: null,

    part,

    templates: {
        [PART_1]:/*html*/`
            <div class="part">
                <h3>X-IF / X-SHOW</h3>
                <pre><code class="language-html" data-template="if"></code></pre>
                <div data-demo="if"></div>

                <h3>X-MODEL</h3>
                <pre><code class="language-html" data-template="model"></code></pre>
                <div data-demo="model"></div>
            </div>
        `,
        [PART_2]:/*html*/`
            <div class="part">
                <h3>X-ON / @</h3>
                <pre><code class="language-html" data-template="event"></code></pre>
                <div data-demo="event"></div>
            </div>
        `,
        [PART_3]:/*html*/`
            <div class="part">
                <h3>X-BIND / :</h3>
                <pre><code class="language-html" data-template="bind"></code></pre>
                <div data-demo="bind"></div>

                <h3>X-INIT</h3>
                <pre><code class="language-html" data-template="init"></code></pre>
                <div data-demo="init"></div>
            </div>
        `,
        [PART_4]:/*html*/`
            <div class="part">
                <h3>X-SHOW.TRANSITION</h3>
                <pre><code class="language-html" data-template="transition"></code></pre>
                <div data-demo="transition"></div>
            </div>
        `,
        [PART_5]:/*html*/`
            <div class="part">
                <h3>X-TEXT / X-HTML</h3>
                <pre><code class="language-html" data-template="text_html"></code></pre>
                <div data-demo="text_html"></div>
            </div>
        `,
    },

    model_template:/*html*/`
        <div x-data="{
            toto: ''
        }">
            <input type="text" x-model="toto" />

            <span x-text="toto"></span>
        </div>
    `,

    if_template:/*html*/`
        <div x-data="{
            condition: true
        }">
            <input type="checkbox" x-model="condition" />

            <template x-if="condition">
                <div>
                    case 1
                </div>
            </template>

            <!-- x-else -->
            <template x-if="!condition">
                <div>
                    case 2
                </div>
            </template>

            <div x-show="condition">
                case 1 with x-show
            </div>
        </div>
    `,

    event_template:/*html*/`
        <div x-data="{
            modalOpened: false,
            
            event:() => alert(\`j'ai clické\`), 
            link: e => alert(\`J'ai clické sur \${e.target.getAttribute(\`href\`)}\`),
            openModal() { this.modalOpened = true; }
        }">
            <button @click="event()">
                Clicker ( syntaxe raccourcie )
            </button>

            <button x-on:click="event()">
                Clicker ( syntaxe longue )
            </button>

            <button @click="openModal()">Ouvrir la modal</button>

            <a href="https://orange.fr" @click.prevent="link($event)">
                Avec le modifieur "prevent"
            </a>

            <div class="modal-overlay" x-show.transition.opacity="modalOpened">
                <div class="modal" @click.away="modalOpened = false">
                    <h2>Je suis une modal</h2>
                    <p>
                        <span x-data="tooltype([
                            {
                                text: \`avec le modifieur ''away''\`,
                                sens: 'top'
                            }
                        ])" x-init="init()">clicker en dehors de moi</span>
                    </p>
                </div>
            </div>
        </div>
    `,

    bind_template:/*html*/`
        <style> .red button { color: red; } </style>

        <div x-data="{
            binded_prop: true,
            handler(raccourcie = true) {
                alert(\`J'ai clické sur le bouton avec la syntaxe \${raccourcie ? \`raccourcie\` : \`non raccourcie\`}\`)
            }
        }" :class="{red: !binded_prop}">
            <input type="checkbox" x-model="binded_prop" />

            <button :disabled="binded_prop" @click="handler()">
                Button
            </button>

            <button x-bind:disabled="binded_prop" @click="handler(false)">
                Button
            </button>
        </div>
    `,

    init_template:/*html*/`
        <div x-data="{
            message: ''
        }" x-init="message = 'Je suis un message';">
            <span x-text="message"></span>
        </div>
    `,

    transition_template:/*html*/`
        <div x-data="{
            condition: true
        }">
            <input type="checkbox" x-model="condition" />

            <div x-show.transition="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>
            
            <div x-show.transition.in="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>
            
            <div x-show.transition.out="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>
            
            <div x-show.transition.opacity="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>
            
            <div x-show.transition.scale="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>
            
            <div x-show.transition.scale.75="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>

            <div x-show.transition.duration.200ms="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>

            <div x-show.transition.origin.top.right="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>

            <div x-show.transition.in.duration.200ms.out.duration.50ms ="condition">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, non?
            </div>
        </div>
    `,

    text_html_template:/*html*/`
        <div x-data="{
            message: 'Message avec <strong>html</strong>'
        }">
            <u>Simple text</u> : <span x-text="message"></span>

            <br>

            <u>Text interprété</u> : <span x-html="message"></div>
        </div>
    `,

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', `templates[${this.part}]`);

        setTimeout(() => {
            Array.from(this.$el.querySelectorAll('pre code')).map(e => {
                e.innerHTML = hljs.highlightAuto(this[e.getAttribute('data-template') + '_template']).value;
                if (e.innerHTML.split('\n').length > 41) {
                    let cmp = 0;
                    e.innerHTML = [...e.innerHTML.split('\n').reduce((r, c) => {
                        if (cmp < 41) {
                            cmp++;
                            result = [...r, c];
                        } else {
                            restul = r;
                        }
                        cmp++;
                        return result;
                    }, []), '...'].join('\n');
                }
                hljs.highlightElement(e);
                document.querySelector(`[data-demo="${e.getAttribute('data-template')}"]`).innerHTML = this[e.getAttribute('data-template') + '_template'];
            });
        }, 100)
    }
});