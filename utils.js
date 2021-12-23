export const random = (num) => Math.ceil(Math.random() * num);

export const getCurrentTime = () => {
    const date = new Date();
    const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
    return time;
};

export const createElem = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    return element;
};