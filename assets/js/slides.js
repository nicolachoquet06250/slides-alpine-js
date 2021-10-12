const items = [
    {
        text: `Sommaire`,
        // image: 'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="sommaire()" x-init="init()"></div>
        `
    },
    {
        text: `Carte d'identité`,
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="identityCard()" x-init="init()"></div>
        `
    },
    {
        text: `Fonctionnalités`,
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="whatIsIt()" x-init="init()"></div>
        `
    },
    {
        text: 'La syntaxe',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe()" x-init="init()"></div>
        `
    },
    {
        text: 'La syntaxe - partie 2',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe(PART_2)" x-init="init()"></div>
        `
    },
    {
        text: 'La syntaxe - partie 3',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe(PART_3)" x-init="init()"></div>
        `
    },
    {
        text: 'La syntaxe - partie 4',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe(PART_4)" x-init="init()"></div>
        `
    },
    {
        text: 'La syntaxe - partie 5',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>

            <div x-data="syntaxe(PART_5)" x-init="init()"></div>
        `
    },
    {
        text: 'Conclusion',
        template:/*html*/`
            <div class="overlay"></div>

            <h2 x-text="item.text.toUpperCase()"></h2>
        `
    },
].map((e, i) => ({...e, element: `slide-${i}`}));