import { random, $formFight } from './utils.js';
import { player1, player2 } from './fighters.js';
import { generateLogs } from './logs.js';

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

export function enemyAttack() {
    const hit = ATTACK[random(3) - 1];
    const defence = ATTACK[random(3) - 1];
    
    return {
        //value: 100,
        value: random(HIT[hit]),
        hit,
        defence,
    }
};

export function playerAttack() {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = random(HIT[item.value]);
            //attack.value = 100;
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    
    return attack;
};

export function kick(player, enemy) {
    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        generateLogs('hit', player1, player2, enemy.value);
    }
    if (enemy.hit === player.defence) {
        generateLogs('defence', player1, player2);
    }
    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        generateLogs('hit', player2, player1, player.value);
    }
    if (enemy.defence === player.hit) {
        generateLogs('defence', player2, player1);
    }
};