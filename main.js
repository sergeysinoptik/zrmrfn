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
    player: 1,
    name: 'Sonya Blade',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + ' Fight...')
    },
};

const liuKang = {
    player: 2,
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

function createElem(tagName, className) {
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

const random = (num) => Math.ceil(Math.random() * num);

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const damage = random(20);
    player.hp > damage ? player.hp -= damage : player.hp = 0;
    $playerLife.style.width = player.hp + '%';
};

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
    }
    if (enemy.hp === 0 && player.hp > 0) {
        $arenas.appendChild(playerWin(player.name));
    }
    if (enemy.hp <= 0 && player.hp <= 0) {
        $arenas.appendChild(playerWin());
    }
};

function disableButton(player, enemy) {
    if (player.hp === 0 || enemy.hp === 0) {
        $randomButton.disabled = true;
    }
};

$randomButton.addEventListener('click', function() {
    changeHP(kitana);
    changeHP(scorpion);
    disableButton(kitana, scorpion);
    showResult(kitana, scorpion);
});

$arenas.appendChild(createPlayer(kitana));
$arenas.appendChild(createPlayer(scorpion));

document.onload = $arenas.classList.add('arena' + random(4));