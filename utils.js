export const random = (num) => Math.ceil(Math.random() * num);

export const $formFight = document.querySelector('.control');

export function getCurrentTime() {
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
    return time;
};

export function createElem(tagName, className) {
    const element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    return element;
};

export function createReloadButton() {
    const $reloadWrap = createElem('div', 'reloadWrap');
    const $reloadButton = createElem('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $reloadButton.addEventListener('click', function() {
        window.location.reload();
    })
    return $reloadWrap;
};

export function disableForm(player, enemy) {
    if (player.hp === 0 || enemy.hp === 0) {
        $formFight.style.display = 'none';
        return true;
    }
    return false;
};