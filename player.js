import { random, createElem } from './utils.js';
class Constantes {
    constructor(num) {
        this.player = num;
    }
    HIT = {
        head: 30,
        body: 25,
        foot: 20,
    }
    ATTACK = ['head', 'body', 'foot'];
};

class Player extends Constantes {
    constructor({ name, hp, img, player }) {
        super(player);

        this.name = name;
        this.hp = hp;
        this.img = img;
        this.formFight = document.querySelector('.control');
    }
    changeHP = (num) => {
        this.hp = this.hp > num ? this.hp - num : 0;
    }
    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    }
    renderHP = () => {
        let $playerLife = this.elHP();
        $playerLife.style.width = `${this.hp}%`;
    }
    createPlayer = () => {
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
        return $player;
    }
    attack = () => {
        if (this.player === 1) {
            const attack = {};
            for (let item of this.formFight) {
                if (item.checked && item.name === 'hit') {
                    attack.value = random(this.HIT[item.value]);
                    attack.hit = item.value;
                }
                if (item.checked && item.name === 'defence') {
                    attack.defence = item.value;
                }
                item.checked = false;
            }    
            return attack;
        } else {
            const hit = this.ATTACK[random(3) - 1];
            const defence = this.ATTACK[random(3) - 1];
            return {
                value: random(this.HIT[hit]),
                hit,
                defence,
            }
        }  
    }
};

export default Player;