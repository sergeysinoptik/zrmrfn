import Player from "./player.js";
import { createElem, random, getCurrentTime } from "./utils.js";
import { fighters } from './fighters.js';
import { logs } from './logs.js';

class Game {
    constructor({ arenas, formFight }) {
        this.arenas = arenas;
        this.formFight = formFight;
        this.player1 = this.createCharacter(1);
        this.player2 = this.createCharacter(2);
    }
    createCharacter = (num) => {
        const character = fighters[random(fighters.length - 1)];
        const player = new Player({
            ...character,
            player: num,
        });
        this.arenas.appendChild(player.createPlayer());
        return player;
    }
    start = () => {
        document.onload = this.arenas.classList.add('arena' + random(4));
        document.onload = this.generateLogs('start', this.player1, this.player2);
    }
    addEvent = () => {
            const player = this.player1.attack();
            const enemy = this.player2.attack();
            
            this.kick(player, enemy);
            
            this.player1.renderHP();
            this.player2.renderHP();
            
            this.disableForm(this.player1, this.player2);
            this.showResult(this.player1, this.player2);
    }
    kick = (player, enemy) => {
        if (enemy.hit !== player.defence) {
            this.player1.changeHP(enemy.value);
            this.generateLogs('hit', this.player1, this.player2, enemy.value);
        }
        if (enemy.hit === player.defence) {
            this.generateLogs('defence', this.player1, this.player2);
        }
        if (enemy.defence !== player.hit) {
            this.player2.changeHP(player.value);
            this.generateLogs('hit', this.player2, this.player1, player.value);
        }
        if (enemy.defence === player.hit) {
            this.generateLogs('defence', this.player2, this.player1);
        }
    };
    playerWin = (name) => {
        const $winMessage = createElem('div', 'win-message');
        if(!name) {
            $winMessage.innerText = 'dead hit';
        } else {
            $winMessage.innerText = name + ' win';
        }
        return $winMessage;
    };
    generateLogs = (type, { name: player1Name, hp }, { name: player2Name }, currentAttack) => {
        const time = `${getCurrentTime()} `;
        const attack = ` -${currentAttack}, [${hp}/100]`;
        let text = '';
        if (type === 'start' || type === 'draw') {
            text = logs[type]
            .replace('[player1]', player1Name)
            .replace('[player2]', player2Name)
            .replace('[time]', time);
        } else {
            text = logs[type][random(logs[type].length) - 1]
            .replace('[playerKick]', player1Name)
            .replace('[playerDefence]', player2Name)
            .replace('[time]', time)
            .replace('[playerWins]', player1Name)
            .replace('[playerLose]', player2Name);
        }
        
        let result = '';
    
        switch (type) {
            case 'start':
                result = text;
                break;
            case 'hit':
                result = time + text + attack;
                break;
            case 'draw':
                result = time + text;
                break;
            default:
                result = time + text;
        };
    
        const el = `<p>${result}</p>`;
        const $chat = document.querySelector('.chat');
        $chat.insertAdjacentHTML('afterbegin', el);
    };
    createReloadButton = () => {
        const $reloadWrap = createElem('div', 'reloadWrap');
        const $reloadButton = createElem('button', 'button');
        $reloadButton.innerText = 'Restart';
        $reloadWrap.appendChild($reloadButton);
        $reloadButton.addEventListener('click', function() {
            window.location.reload();
        })
        return $reloadWrap;
    };
    showResult = (player, enemy) => {
        if (player.hp === 0 && enemy.hp > 0) {
            this.arenas.appendChild(this.playerWin(enemy.name));
            this.generateLogs('end', enemy, player);
        }
        if (enemy.hp === 0 && player.hp > 0) {
            this.arenas.appendChild(this.playerWin(player.name));
            this.generateLogs('end', player, enemy);
        }
        if (enemy.hp === 0 && player.hp === 0) {
            this.arenas.appendChild(this.playerWin());
            this.generateLogs('draw', player, enemy);
        }
        if (this.disableForm(player, enemy)) {
            this.arenas.appendChild(this.createReloadButton());
        };
    };
    disableForm = (player, enemy) => {
        if (player.hp === 0 || enemy.hp === 0) {
            this.formFight.style.display = 'none';
            return true;
        }
        return false;
    };
};

export default Game;