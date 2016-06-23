import { normalizeUnits } from './units';
import { startOf, endOf } from './start-end-of';
import isValidDate from './valid';

export function isAfter (first, second, units) {
    if (!isValidDate(first) || !isValidDate(second)) {
        throw new Error('Invalid date');
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return first > second;
    } else {
        return second.valueOf() < startOf(first, units).valueOf();
    }
}

export function isBefore (first, second, units) {
    if (!isValidDate(first) || !isValidDate(second)) {
        throw new Error('Invalid date');
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return first < second;
    } else {
        return endOf(first, units).valueOf() < second.valueOf();
    }
}

export function isBetween (date, from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? isAfter(date, from, units) : !isBefore(date, from, units)) &&
        (inclusivity[1] === ')' ? isBefore(date, to, units) : !isAfter(date, to, units));
}

export function isSame (date, input, units) {
    if (!isValidDate(date) || !isValidDate(input)) {
        throw new Error('Invalid date');
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return date.getTime() === input.getTime();
    } else {
        const inputMs = input.valueOf();
        return startOf(date, units).valueOf() <= inputMs && inputMs <= endOf(date, units).valueOf();
    }
}

export function isSameOrAfter (date, input, units) {
    return isSame(date, input, units) || isAfter(date, input, units);
}

export function isSameOrBefore (date, input, units) {
    return isSame(date, input, units) || isBefore(date, input, units);
}
