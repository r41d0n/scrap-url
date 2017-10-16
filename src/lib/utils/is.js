export function isArray(variable) {
    return variable instanceof Array;
}

export function isDefined(variable) {
    return typeof variable !== 'undefined' && variable !== null;
}

export function isFunction(variable) {
    return typeof variable === 'function';
}

export function isObject(variable) {
    return isDefined(variable) && typeof variable === 'object';
}

export function isUrl(variable) {
    const pattern = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;

    if (variable.match(pattern))
        return true;
    else
        return false;
}