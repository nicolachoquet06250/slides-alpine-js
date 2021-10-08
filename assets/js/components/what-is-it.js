/**
 *  - moins lourd que les frameworks js
 *  - avantages des frameworks sans les inconvénients
 *  - scope côté html -> x-data
 *  - réutilise la syntaxe vue.js
 *  - demande moins de lignes de code que le js vanilla pour un comportement équivalent
 *    - ex: @click.away -> click en dehors de l'élément
 *  - possibilité d'écrir des expressions javascript dans des attributs spécifiques
 *  - principalement utilisé pour du rendu server
 */

const whatIsIt = (type='avantages') => ({
    componentName: 'what-is-it',
    $el: null,

    avantages: [
        { text: `Plus léger qu'un framework classique` },
        { text: `Travail directement avec le DOM` },
        { text: `Pas d'outillage superflux obligatoir comme babel ou webpack` },
        { text: 'Principalement utile pour du rendu côté server' },
        { text: `Emprinte sa syntaxe à Vue.js en remplaçant les "v-" par des "x-" dans ses directives` },
        {
            text: `Scope côté HTML`, 
            list: [
                {
                    text: `x-data="{prop1: 'value', method1() {...}}"`,
                    tooltypes: [
                        {
                            text: '<dd>Permet de créer un scope dans un bloque de code HTML</dd>',
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text: `x-init="init()"`,
                    tooltypes: [
                        {
                            text: `<dd>Lance une fonction d'initialisation qui doit être présente<br>dans le scope précédement créé avec x-data</dd>`,
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text: `x-bind:attribute='value'`,
                    tooltypes: [
                        {
                            text: '<strong>alias :attribute=&quot;value&quot;</strong>',
                            sens: 'top'
                        },
                        {
                            text: '<dd>Permet de binder une variable du scope à un attribut HTML</dd>',
                            sens: 'bottom'
                        }
                    ]
                },
                // { text: '...etc' }
            ]
        },
        {
            text: [
                'Possède des "modifieurs" cumulables sur les évenements',
                'Exemples: '
            ],
            list: [
                {
                    text: 'x-on:click.away',
                    tooltypes: [
                        {
                            text: '<strong>alias &quot;@click.away&quot;</strong>', 
                            sens: 'top'
                        }, {
                            text: `<dd>Défini un évenement click qui se déclanche lorse qu'on<br>click en dehors de l'élément</dd>`, 
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text: 'x-on:click.prevent',
                    tooltypes: [
                        {
                            text: '<strong>alias &quot;@click.prevent&quot;</strong>', 
                            sens: 'top'
                        }, {
                            text: `<dd>Défini un évenement click qui lancera un event.preventDefault()<br>au début de l'évenement</dd>`, 
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text: 'x-on:click.stop',
                    tooltypes: [
                        {
                            text: '<strong>alias &quot;@click.stop&quot;</strong>', 
                            sens: 'top'
                        }, {
                            text: `<dd>Défini un évenement click qui lancera un event.stopPropagation()<br>au début de l'évenement</dd>`, 
                            sens: 'bottom'
                        }
                    ]
                }
            ]
        }
    ],
    inconvenients: [],

    get template_avantages() {
        return/*html*/`
            <div>
                <ul class="list">
                    <template x-for="avantage of Array.from(Array(5).keys()).map(i => avantages[i])">
                        <li x-text="avantage.text"></li>
                    </template>

                    <li>
                        <span x-text="avantages[5].text"></span>

                        <ul class="list sub-list">
                            <template x-for="item of avantages[5].list">
                                <li :data-tooltypes="JSON.stringify(item.tooltypes)" :data-text="item.text">
                                    <dt x-data="tooltype()" x-init="init()"></dt>
                                </li>
                            </template>

                            <li> ...etc </li>
                        </ul>
                    </li>

                    <li>
                        <span x-text="avantages[6].text[0]"></span>
                        <br>
                        <span style="margin-left: 25px;" x-text="avantages[6].text[1]"></span>

                        <ul class="list sub-list">
                            <template x-for="item of avantages[6].list">
                                <li :data-tooltypes="JSON.stringify(item.tooltypes)" :data-text="item.text">
                                    <dt x-data="tooltype()" x-init="init()"></dt>
                                </li>
                            </template>

                            <li> ...etc </li>
                        </ul>
                    </li>
                </ul>
            </div>
        `;
    },

    get template_inconvenients() {
        return/*html*/`
            <div>

            </div>
        `;
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', `template_avantages`);
    }
});