import { random, createElem } from './utils.js';

class Constantes {
    constructor(name) {
        this.player = name;
    };
};

class Player extends Constantes {
    constructor({ name, hp, img, player }) {
        super(player);

        this.name = name;
        this.hp = hp;
        this.img = img;
    };
    changeHP = (num) => {
        this.hp = this.hp > num ? this.hp - num : 0;
    };
    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    };
    renderHP = () => {
        let $playerLife = this.elHP();
        $playerLife.style.width = `${this.hp}%`;
    };
    createPlayer = () => {
        const $arenas = document.querySelector('.arenas');
        const $player = createElem('div', `player${this.player}`);
        const $progressbar = createElem('div', 'progressbar');
        const $character = createElem('div', 'character');
        const $life = createElem('div', 'life');
        const $name = createElem('div', 'name');
        const $img = createElem('img');
        
        $life.style.width = `${this.hp}%`;
        $name.innerText = this.name;
        $img.src = this.img;
    
        $progressbar.appendChild($name);
        $progressbar.appendChild($life);
    
        $character.appendChild($img);
    
        $player.appendChild($progressbar);
        $player.appendChild($character);
        $arenas.appendChild($player);
        return $player;
    };
};

export default Player;