import {normalizeUnits} from './units';

export function setMonth (date, month) {
	const dayOfMonth = Math.min(date.getDate(), daysInMonth(date.getFullYear(), month));
	date.setMonth(month, dayOfMonth);
}

export function daysInMonth (year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function setDayOfWeek (date, input) {
    const day = date.getDay();
    date.setDate(date.getDate() + input - day);
}

function Duration (duration) {
    var years = duration.year || 0,
        quarters = duration.quarter || 0,
        months = duration.month || 0,
        weeks = duration.week || 0,
        days = duration.day || 0,
        hours = duration.hour || 0,
        minutes = duration.minute || 0,
        seconds = duration.second || 0,
        milliseconds = duration.millisecond || 0;

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;
}

function createDuration (input, key) {
    const duration = {};
    if (key) {
        duration[normalizeUnits(key)] = input;
    } else {
        duration.millisecond = input;
    }

    return new Duration(duration);
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

function createAdder (direction) {
    return function (date, val, period) {
        const duration = createDuration(val, period);
        return addSubtract(date, duration, direction);
    };
}

function addSubtract (original, duration, isAdding) {
	const date = new Date(original.valueOf());
    const milliseconds = duration._milliseconds;
    const days = absRound(duration._days);
    const months = absRound(duration._months);

    if (milliseconds) {
        date.setTime(date.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        date.setDate(date.getDate() + days * isAdding);
			//set(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(date, date.getMonth() + months * isAdding);
    }
	return date;
}

export const add = createAdder(1);
export const subtract = createAdder(-1);
