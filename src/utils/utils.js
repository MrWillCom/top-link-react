export function debounceFunction(func, delay) {
    let timer;
    return function () {
        let self = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(self, args);
        }, delay);
    };
}


export function isNumber(value) {
    return !isNaN(value);
}

export function isEmail(value) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(value);
}

export function isUsername(value) {
    return /^[a-zA-Z0-9_-]{4,16}$/i.test(value);
}

export function isContainSpecial(value) {
    return /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im.test(value);
}

export function isChinese(value) {
    return /[\u4e00-\u9fa5]/i.test(value);
}