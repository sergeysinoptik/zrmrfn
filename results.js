import { createElem } from './utils.js';
import { generateLogs } from './logs.js';


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

export function showResult(player, enemy) {
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