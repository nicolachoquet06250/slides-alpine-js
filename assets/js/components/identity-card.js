const identityCard = () => ({
    componentName: 'identity-card',
    $el: null,

    get header() {
        return `Framework Javascript`.split(' ')
            .map(e => e.toUpperCase())
            .map(e => `<span>${e}</span>`).join('');
    },

    get footer() {
        return [
            'IDFRAALPINEJS<<<<<<<<<<<<<<<<<< 061038',
            `${this.identityNumber}4ALPINE<< JS1912184M2`
        ].map(e => e.split('').map(_e => `<span>${_e}</span>`).join(''));
    },

    github: 'https://github.com/alpinejs/alpine',
    parent: {
        name: 'Caleb Porzio',
        github: 'https://github.com/calebporzio'
    },
    identityNumber: '123456789123',
    logo: 'https://avatars.githubusercontent.com/u/59030169?s=280&v=4',
    name: 'Alpine.js'.toUpperCase(),
    firstRealeseDate: '18/12/2019',
    size: '21.9 kB',

    get base64Sign() {
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLUAAAGDCAMAAADqANIdAAAAAXNSR0IB2cksfwAAAAlwSFlzAAASdAAAEnQB3mYfeAAAAMlQTFRFAAAAn5+fICAgl5eXAAAA5+fnQEBAz8/PCAgIr6+vUFBQSEhIh4eHeHh4aGho39/fv7+/GBgYODg4f39/YGBgWFhYx8fHKCgocHBwEBAQt7e3j4+P19fXMDAwp6enCQkJTk5OkJCQAwMDHh4eBQUF9/f3Z2dn7+/vDw8PTU1NOjo6////Kioqg4ODHx8fXl5eDAwMa2trLS0tHR0dUVFRmpqaR0dHBgYGY2Njra2tpqamBAQEMjIyc3NzAgICRkZGaWlpAQEBNzc3N0SOdQAAAEN0Uk5TAP////+A/////////////////////////////////////////////////////////////////////////////////wzEbxoAACicSURBVHic7Z3poupKcJ0ZGjGDoJmn2M5w7TieMnhI4jj2+z+U1RIISWhWN5LQ9/05+96zD1uw0aKqelVVrwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAraI/GAzrvgYAgNwMhcOo7qsAAMjLQKkWwRYAtAYlWsKq+yoAAHIyFmIwIUUEgNYwFWI2J0UEgNawEGLZJ0UEgNawUnGWkyKu674QAIBcWELYPSdFXNR9IQAAudioSryTIm7rvhAAgDyoI0TnD1JEAGgJUoid8wcpIgC0BEuIqfMHKSIAtAQhhPsnKSIAtALfqUWKCACtYC+EdL8gRQSAVrAR4uB9RYoIAG3gVdb6xRSxb/XrvgQA0M1YiOPzy19LEcc7ISZ1XwQA6EYNfHh97aSI4zqvRSvSnXW4r/syAEA3CyFOr69nQqzqvBaNyLM76nBe93UAgHZWgcFa09/IqNb9natZm5Vd96UAgH4sIS7+fzhJ1bXGa9GAo1huZijEgEI8wG9yDI5evnqN1G1l+lIsNAvgh5HvYnzPrcdPa7uUStyu85diCUse6r4cAPgSKxESsbYwPg3eikUxC6BL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`
    },

    get template() {
        return/*html*/`
            <div class="identity-card">
                <header x-html="header"></header>

                <header>
                    <span> Carte Numérique d'identité n° : <strong x-text="identityNumber"></strong></span>
                    <span> JavaScript </span>
                </header>

                <main>
                    <div>
                        <img :src="logo" alt="logo alpine.js" />
                    </div>
                    
                    <div>
                        <span> Père: 
                            <strong>
                                <a :href="parent.github" :data-text="parent.name" target="_blank">
                                    <span x-data="underline_animation()" x-init="init()"></span>
                                </a> 
                            </strong>
                        </span>

                        <span> Nom: <strong x-text="name"></strong> </span>

                        <span> Né le : <strong x-text="firstRealeseDate"></strong> </span>

                        <span> 
                            à : <strong> 
                                <a :href="github" target="_blank">
                                    <span x-data="underline_animation()" x-init="init()">
                                        GITHUB
                                    </span>
                                </a> 
                            </strong> 
                        </span>

                        <span>
                            Taille minifié: <strong x-text="size"></strong>
                        </span>

                        <span style="display: flex; flex-direction: column;">
                            Signature du titulaire : 
                            <img :src="base64Sign" style="width: 200px;" />
                        </span>
                    </div>
                </main>

                <footer>
                    <template x-for="line of footer">
                        <div x-html="line"></div>
                    </template>
                </footer>
            </div>
        `;
    },

    init() {
        this.$el.setAttribute('data-component', this.componentName);
        this.$el.setAttribute('x-html', `template`);
    }
});