const scorpion = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const subZero = {
    name: 'Sub-Zero',
    hp: 30,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};


function createPlayer(htmlClass, obj) {
    
    const createElem = (cl, tag, parent) => {
        const elem = document.createElement(tag);
        parent.appendChild(elem);
        if (cl.length !== 0) {
            elem.classList.add(cl);
        }
    }
    
    const $arenas = document.querySelector('.arenas');
    createElem(htmlClass, 'div', $arenas);
    
    const $player = document.querySelector('.' + htmlClass);
    createElem('progressbar', 'div', $player);
    createElem('character', 'div', $player);

    const $progressbar = $player.querySelector('.progressbar');
    createElem('life', 'div', $progressbar);
    createElem('name', 'div', $progressbar);

    const $character = $player.querySelector('.character');
    createElem('', 'img', $character);
    
    const $life = $progressbar.querySelector('.life');
    $life.style.width = obj.hp + '%';

    const $name = $progressbar.querySelector('.name');
    $name.innerText = obj.name;

    const $img = $character.querySelector('img');
    $img.src = obj.img;
};

createPlayer('player1', scorpion);
createPlayer('player2', subZero);