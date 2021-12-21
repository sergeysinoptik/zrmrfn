import { random, getCurrentTime, createElem } from './utils.js';
import { createPlayer, player1, player2 } from './fighters.js';
import { enemyAttack, playerAttack, $formFight, kick } from './attack.js';
import { generateLogs } from './logs.js';

player1.player = 1;
player2.player = 2;

const $arenas = document.querySelector('.arenas');













function playerWin(name) {
    const $loseTitle = createElem('div', 'loseTitle');
    if(!name) {
        $loseTitle.innerText = 'dead hit';
    } else {
        $loseTitle.innerText = name + ' win';
    }
    return $loseTitle;
};

function showResult(player, enemy) {
    if (player.hp === 0 && enemy.hp > 0) {
        $arenas.appendChild(playerWin(enemy.name));
        generateLogs('end', enemy, player);
    }
    if (enemy.hp === 0 && player.hp > 0) {
        $arenas.appendChild(playerWin(player.name));
        generateLogs('end', player, enemy);
    }
    if (enemy.hp === 0 && player.hp === 0) {
        $arenas.appendChild(playerWin());
        generateLogs('draw', player, enemy);
    }
};

function disableForm(player, enemy) {
    if (player.hp === 0 || enemy.hp === 0) {
        $formFight.style.display = 'none';
        return true;
    }
    return false;
};

function createReloadButton() {
    const $reloadWrap = createElem('div', 'reloadWrap');
    const $reloadButton = createElem('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    })
    return $reloadWrap;
}

$arenas.appendChild(createPlayer(player1, 1));
$arenas.appendChild(createPlayer(player2, 2));









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
