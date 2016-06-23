import { normalizeUnits } from './units';
import isValidDate from './valid';
import { add } from './setters';

export function diff (first, second, units, asFloat) {
	let output;
    if (!isValidDate(first) || !isValidDate(second)) {
		throw new Error('Invalid date');
	}

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(first, second);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        const delta = first - second;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? delta / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? delta / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.getFullYear() - a.getFullYear()) * 12) + (b.getMonth() - a.getMonth()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = add(a, wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = add(a, wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = add(a, wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}
