function createPlayer(htmlClass, obj) {
    
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

const createElem = (cl, tag, parent) => {
    const elem = document.createElement(tag);
    parent.appendChild(elem);
    if (cl.length !== 0) {
        elem.classList.add(cl);
    }
};

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

const sonya = {
    name: 'Sonya Blade',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const liuKang = {
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const kitana = {
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

createPlayer('player1', kitana);
createPlayer('player2', liuKang);