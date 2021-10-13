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
    type,

    features: [
        { 
            text: `Micro-Framework Léger`,
            tooltypes: [
                {
                    text: '<strong>6,4kb</strong> GZippé & minifié',
                    sens: 'top'
                }
            ]
        },
        { text: `Pas de virtual-DOM` },
        { text:/*html*/`Pas d'outillage superflux obligatoire comme <strong>babel</strong> ou <strong>webpack</strong>` },
        { text: `Principalement utile pour du rendu côté server` },
        { text: `Non adapté pour des SPA avec routage` },
        { text: `Emprunte sa syntaxe à Vue.js en remplaçant les "v-" par des "x-" dans ses directives` },
        {
            text: `Scope côté HTML`, 
            list: [
                {
                    text:/*html*/`<strong>x-data="{prop1: 'value', method1() {...}}"</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<dd>Permet de créer un scope dans un bloque de code HTML</dd>`,
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text:/*html*/`<strong>x-init="init()"</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<dd>Lance une fonction d'initialisation qui doit être présente<br>dans le scope précédement créé avec x-data</dd>`,
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text:/*html*/`<strong>x-bind:attribute='value'</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<strong>alias :attribute=&quot;value&quot;</strong>`,
                            sens: 'top'
                        },
                        {
                            text:/*html*/`<dd>Permet de binder une variable du scope à un attribut HTML</dd>`,
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text:/*html*/`<strong>x-if='true|false'</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<dd>Rajoute l'élément dans le DOM si la condition est remplie<br>et le supprime si celle-ci n'est pas replie</dd>`,
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text:/*html*/`<strong>x-else</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<dd>Fait la même chose que le x-if mais pour le négatif de la condition</dd>`,
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text:/*html*/`<strong>x-show='true|false'</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<dd>Rajoute un <strong>display: none</strong> sur l'élément si la condition n'est pas remplie<br>et le supprime si celle-ci est replie</dd>`,
                            sens: 'bottom'
                        }
                    ]
                },
                { text: '...etc' }
            ]
        },
        {
            text: [
                'Possède des "modificateurs" cumulables sur les évènements',
                `<span style="margin-left: 25px;">Exemples: </span>`
            ],
            list: [
                {
                    text:/*html*/`<strong>x-on:click.away</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<strong>alias &quot;@click.away&quot;</strong>`, 
                            sens: 'top'
                        }, {
                            text:/*html*/`<dd>Défini un évenement click qui se déclanche lorse qu'on<br>click en dehors de l'élément</dd>`, 
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text:/*html*/`<strong>x-on:click.prevent</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<strong>alias &quot;@click.prevent&quot;</strong>`, 
                            sens: 'top'
                        }, {
                            text:/*html*/`<dd>Défini un évenement click qui lancera un event.preventDefault()<br>au début de l'évenement</dd>`, 
                            sens: 'bottom'
                        }
                    ]
                },
                {
                    text:/*html*/`<strong>x-on:click.stop</strong>`,
                    tooltypes: [
                        {
                            text:/*html*/`<strong>alias &quot;@click.stop&quot;</strong>`, 
                            sens: 'top'
                        }, {
                            text:/*html*/`<dd>Défini un évenement click qui lancera un event.stopPropagation()<br>au début de l'évenement</dd>`, 
                            sens: 'bottom'
                        }
                    ]
                }
            ]
        }
    ],

    get template() {
        return/*html*/`
            <div>
                <ul class="list">
                    <template x-for="feature of features">   
                        <li :data-text="feature.text" 
                            :data-tooltypes="JSON.stringify(feature.tooltypes ?? [])">
                            <span x-data="tooltype()" x-init="init()"></span>

                            <ul class="list sub-list" x-show="feature.list">
                                <template x-for="item of list(feature.list)">
                                    <li :data-tooltypes="JSON.stringify(item.tooltypes)" 
                                        :data-text="item.text">
                                        <dt x-data="tooltype()" x-init="init()"></dt>
                                    </li>
                                </template>
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        `;
    },

    list: l => Array.isArray(l) ? l : [],

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', `template`);
    }
});