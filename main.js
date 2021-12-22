import { random, createReloadButton, disableForm } from './utils.js';
import { createPlayer, player1, player2 } from './fighters.js';
import { enemyAttack, playerAttack, kick } from './attack.js';
import { generateLogs } from './logs.js';
import { showResult } from './results.js';

player1.player = 1;
player2.player = 2;

const $arenas = document.querySelector('.arenas');
$arenas.appendChild(createPlayer(player1, 1));
$arenas.appendChild(createPlayer(player2, 2));

const $formFight = document.querySelector('.control');

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
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
