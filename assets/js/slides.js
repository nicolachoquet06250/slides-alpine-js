const items = [
    {
        text: `Sommaire`,
        // image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="sommaire()" x-init="init()"></div>
        `,
        element: 'slide-0'
    },
    {
        text: `Carte d'identité`,
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="identityCard()" x-init="init()"></div>
        `,
        element: 'slide-1'
    },
    {
        text: `Fonctionnalités`,
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="whatIsIt()" x-init="init()"></div>
        `,
        element: 'slide-2'
    },
    {
        text: 'La syntaxe',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe()" x-init="init()"></div>
        `,
        element: 'slide-3'
    },
    {
        text: 'La syntaxe - partie 2',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe(PART_2)" x-init="init()"></div>
        `,
        element: 'slide-4'
    },
    {
        text: 'La syntaxe - partie 3',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe(PART_3)" x-init="init()"></div>
        `,
        element: 'slide-5'
    },
    {
        text: 'La syntaxe - partie 4',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe(PART_4)" x-init="init()"></div>
        `,
        element: 'slide-6'
    },
    {
        text: 'Conclusion',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>
        `,
        element: 'slide-7'
    },
];