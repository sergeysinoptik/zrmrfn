const scorpion = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const subZero = {
    player: 2,
    name: 'Sub-Zero',
    hp: 30,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const sonya = {
    name: 'Sonya Blade',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const liuKang = {
    name: 'Liu Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const kitana = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const createElem = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    return element;
};

function createPlayer(obj) {
    const $player = createElem('div', 'player' + obj.player);
    const $progressbar = createElem('div', 'progressbar');
    const $character = createElem('div', 'character');
    const $life = createElem('div', 'life');
    const $name = createElem('div', 'name');
    const $img = createElem('img');
    
    $life.style.width = obj.hp + '%';
    $name.innerText = obj.name;
    $img.src = obj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
};

const changeHP = (player) => {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const damage = Math.ceil(Math.random() * 20);
    player.hp > damage ? player.hp -= damage : player.hp = 0;
    $playerLife.style.width = player.hp + '%';
};

const playerWin = (name) => {
    const $loseTitle = createElem('div', 'loseTitle');
    $loseTitle.innerText = name + ' win';

    return $loseTitle;
};

$randomButton.addEventListener('click', function() {
    changeHP(kitana);
    changeHP(scorpion);
    if (scorpion.hp <= 0 && kitana.hp > 0) {
        $arenas.appendChild(playerWin(kitana.name));
        $randomButton.disabled = true;
    } else if (kitana.hp <= 0 && scorpion.hp > 0) {
        $arenas.appendChild(playerWin(scorpion.name));
        $randomButton.disabled = true;
    } else if (kitana.hp <= 0 && scorpion.hp <= 0) {
        $arenas.appendChild(playerWin('nobody'));
        $randomButton.disabled = true;
    } else {
        $randomButton.disabled = false;
    }
});

$arenas.appendChild(createPlayer(kitana));
$arenas.appendChild(createPlayer(scorpion));

document.onload = $arenas.classList.add('arena' + Math.ceil(Math.random() * 4));