import { random, createReloadButton, disableForm } from './utils.js';
import { fighters } from './fighters.js';
import { generateLogs } from './logs.js';
import { showResult } from './results.js';
import Player from './player.js';

let character = fighters[random(fighters.length - 1)];
let enemy = fighters[random(fighters.length - 1)];

let player1 = new Player({
    ...character,
    player: 1,
});

let player2 = new Player({
    ...enemy,
    player: 2,
});

console.log(player1, player2)

const kick = (player, enemy) => {
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

const $arenas = document.querySelector('.arenas');
$arenas.appendChild(player1.createPlayer());
$arenas.appendChild(player2.createPlayer());

const $formFight = document.querySelector('.control');

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = player2.attack();
    const player = player1.attack();
    kick(player, enemy);
    player1.renderHP();
    player2.renderHP();
    disableForm(player1, player2);
    showResult(player1, player2);
    if (disableForm(player1, player2)) {
        $arenas.appendChild(createReloadButton());
    };
})

document.onload = $arenas.classList.add('arena' + random(4));
document.onload = generateLogs('start', player1, player2);
