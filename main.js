import Game from './game.js';

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const game = new Game({
    arenas: $arenas,
    formFight: $formFight,
});

game.start();

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    game.addEvent();
});