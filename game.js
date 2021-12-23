import Player from "./player.js";
import { createElem, random, getCurrentTime } from "./utils.js";
import { fighters } from './fighters.js';
import { logs } from './logs.js';

class Game {
    $arenas = document.querySelector('.arenas');
    createCharacter = (num) => {
        const character = fighters[random(fighters.length - 1)];
        const player = new Player({
            ...character,
            player: num,
        });
        this.$arenas.appendChild(player.createPlayer());
        return player;
    }
    $formFight = document.querySelector('.control');
    start = () => {
        const player1 = this.createCharacter(1);
        const player2 = this.createCharacter(2);

        const kick = (player, enemy) => {
            if (enemy.hit !== player.defence) {
                player1.changeHP(enemy.value);
                this.generateLogs('hit', player1, player2, enemy.value);
            }
            if (enemy.hit === player.defence) {
                this.generateLogs('defence', player1, player2);
            }
            if (enemy.defence !== player.hit) {
                player2.changeHP(player.value);
                this.generateLogs('hit', player2, player1, player.value);
            }
            if (enemy.defence === player.hit) {
                this.generateLogs('defence', player2, player1);
            }
        };
        
        const showResult = () => this.showResult(player1, player2);
        const disableForm = () => this.disableForm(player1, player2);

        this.$formFight.addEventListener('submit', function(e) {
            e.preventDefault();
            const enemy = player2.attack();
            const player = player1.attack();
            kick(player, enemy);
            player1.renderHP();
            player2.renderHP();
            disableForm();
            showResult();
            
        })

        document.onload = this.$arenas.classList.add('arena' + random(4));
        document.onload = this.generateLogs('start', player1, player2);
    }
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
            this.$arenas.appendChild(this.playerWin(enemy.name));
            this.generateLogs('end', enemy, player);
        }
        if (enemy.hp === 0 && player.hp > 0) {
            this.$arenas.appendChild(this.playerWin(player.name));
            this.generateLogs('end', player, enemy);
        }
        if (enemy.hp === 0 && player.hp === 0) {
            this.$arenas.appendChild(this.playerWin());
            this.generateLogs('draw', player, enemy);
        }
        if (this.disableForm(player, enemy)) {
            this.$arenas.appendChild(this.createReloadButton());
        };
    };
    disableForm = (player, enemy) => {
        if (player.hp === 0 || enemy.hp === 0) {
            this.$formFight.style.display = 'none';
            return true;
        }
        return false;
    };
};

export default Game;