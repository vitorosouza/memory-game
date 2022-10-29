const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',   
];

const createElement = (tag,className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card'); //Procura por todos elementos que possuem a classe disabled-card

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML} segundos`);
    
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character'); //Pegou os dois atributos, da primeira carta e da segunda
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card'); //adiciona 
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card'); //remove apenas a parte da frente
            secondCard.classList.remove('reveal-card');

            firstCard = ''; //Reseta as cartas para jogar de novo
            secondCard = '';

        }, 500)     
    }
}

const revealCard = ({ target }) => {
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card'); //Parent node para acessar o "pai" desse target
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card'); //Parent node para acessar o "pai" desse target
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (character) => { //Essa função CRIA A CARTA

    const card = createElement('div', 'card'); //Criou os elementos
    const front = createElement('div', 'face front');//Criou os elementos
    const back = createElement('div', 'face back');//Criou os elementos

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);//Montou a carta 
    card.appendChild(back);//Montou a carta 

    card.addEventListener('click', revealCard); //Adiciona um evento ao clicar que no caso é revelar a carta

    card.setAttribute('data-character', character);//Passando personagem por personagem

    return card;
}

const loadGame = () => { //Essa função GERA/CARREGA TODO O JOGO.
    const duplicateCharacters = [ ... characters, ... characters] //O array characters espalha os elementos 2x no array DuplicatesCharacter
    
    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5);

    shuffledArray.forEach((character) => { //Percorre todo o ARRAY, ele irá gerar várias cartas
        const card = createCard(character);
        grid.appendChild(card);     
    }); 
}

const startTimer = () => {

    this.loop = setInterval(() => {
       const currentTime = +timer.innerHTML;
       timer.innerHTML = currentTime + 1; 
    }, 1000);

}

window.onload = () => { //Vamos executar alg. coisa dentro desse escopo, quando a janela tiver carregada
    //O spanPlayer é um elemento HTML, por isso que usa o innerHTML.
    //E o localStorage.getItem pega o valor que está salvo no player.
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}




