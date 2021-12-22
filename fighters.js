import { createElem, random } from './utils.js';

export const fighters = {
    kitana: {
        name: 'Kitana',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        weapon: ['weapon1', 'weapon2', 'weapon3'],
        attack: function() {
            console.log(this.name + ' Fight...')
        },
        changeHP,
        elHP,
        renderHP,
    },
    liukang: {
        name: 'Liu Kang',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
        weapon: ['weapon1', 'weapon2', 'weapon3'],
        attack: function() {
            console.log(this.name + ' Fight...')
        },
        changeHP,
        elHP,
        renderHP,
    },
    sonya: {
        name: 'Sonya Blade',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
        weapon: ['weapon1', 'weapon2', 'weapon3'],
        attack: function() {
            console.log(this.name + ' Fight...')
        },
        changeHP,
        elHP,
        renderHP,
    },
    subzero: {
        name: 'Sub-Zero',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['weapon1', 'weapon2', 'weapon3'],
        attack: function() {
            console.log(this.name + ' Fight...')
        },
        changeHP,
        elHP,
        renderHP,
    },
    scorpion: {
        name: 'Scorpion',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['weapon1', 'weapon2', 'weapon3'],
        attack: function() {
            console.log(this.name + ' Fight...')
        },
        changeHP,
        elHP,
        renderHP,
    },
};

function changeHP(num) {
    this.hp = this.hp > num ? this.hp - num : 0;
};

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
};

function renderHP() {
    const $playerLife = this.elHP();
    $playerLife.style.width = this.hp + '%';
};

export function createPlayer(obj, num) {
    const $player = createElem('div', 'player' + num);
    const $progressbar = createElem('div', 'progressbar');
    const $character = createElem('div', 'character');
    const $life = createElem('div', 'life');
    const $name = createElem('div', 'name');
    const $img = createElem('img');
    
    $life.style.width = obj.hp + '%';
    $name.innerText = obj.name;
    $img.src = obj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
};

let fightersNames = Object.keys(fighters);

const player1Name = fightersNames[random(fightersNames.length - 1)];

fightersNames = fightersNames.filter((i) => i !== player1Name);

const player2Name = fightersNames[random(fightersNames.length - 1)];

export const player1 = fighters[player1Name];
export const player2 = fighters[player2Name];
