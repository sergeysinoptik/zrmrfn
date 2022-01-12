import Player from "./player.js";
import { createElem, random, getCurrentTime } from "./utils.js";
import { logs } from './logs.js';

class Game {
    constructor({ arenas, formFight }) {
        this.arenas = arenas;
        this.formFight = formFight;
        this.player1 = this.getPlayer(1);
        this.player2 = this.getPlayer(2);
    }
    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    };
    getRandomPlayer = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return body;
    };
    getAttack = async (attack) => {
        const a = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify(attack),
        }).then(res => res.json());
        return a;
    };
    getPlayer = async (num) => {
        const players = await this.getPlayers();
        const p = players[random(players.length - 1)];
        const player = new Player({
            ...p,
            player: num,
        });
        return player;
    }
    attack = async () => {
        const attack = {};
        for (let item of this.formFight) {
            if (item.checked && item.name === 'hit') {
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        } 
        const a = await this.getAttack(attack);
        return a;
    };
    start = async () => {
        const player1 = await this.player1;
        const player2 = await this.player2;

        this.arenas.appendChild(player1.createPlayer());
        this.arenas.appendChild(player2.createPlayer());
        
        document.onload = this.arenas.classList.add('arena' + random(4));
        document.onload = this.generateLogs('start', player1, player2);
    };
    addEvent = async () => {
            const player = await this.player1;
            const enemy = await this.player2;
            
            this.kick(player, enemy);
            
            this.disableForm(this.player1, this.player2);
    }
    kick = async (player1, player2) => {
        const attack = await this.attack();
        const { player1: player, player2: enemy } = attack;

        if (enemy.hit !== player.defence) {
            player1.changeHP(enemy.value);
            this.generateLogs('hit', player2, player1, enemy.value);
        }
        if (enemy.hit === player.defence) {
            this.generateLogs('defence', player2, player1);
        }
        if (enemy.defence !== player.hit) {
            player2.changeHP(player.value);
            this.generateLogs('hit', player1, player2, player.value);
        }
        if (enemy.defence === player.hit) {
            this.generateLogs('defence', player1, player2);
        }
        
        player1.renderHP();
        player2.renderHP();

        this.showResult(player1, player2);
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
    generateLogs = (type, { name: player1Name }, { name: player2Name, hp }, currentAttack) => {
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