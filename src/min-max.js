import isValidDate from './valid';
import { isBefore, isAfter } from './compare';

function pickBy (fn, moments) {
    var res, i;
    if (!moments.length) {
        return new Date();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
		if (!isValidDate(moments[i])) {
			throw new Error('Invalid date');
		} else if (fn(moments[i], res)) {
			res = moments[i];
		}
    }
    return res;
}

export function min (...dates) {
    return pickBy(isBefore, dates);
}

export function max (...dates) {
    return pickBy(isAfter, dates);
}
