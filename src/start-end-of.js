import { normalizeUnits } from './units';
import { setMonth, setDayOfWeek } from './setters';
import { add, subtract} from './setters';

export function startOf (date, units) {
    units = normalizeUnits(units);
    const modified = new Date(date.valueOf());
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            setMonth(modified, 0);
            /* falls through */
        case 'quarter':
        case 'month':
            modified.setDate(1);
            /* falls through */
        case 'week':
        case 'day':
        case 'date':
            modified.setHours(0);
            /* falls through */
        case 'hour':
            modified.setMinutes(0);
            /* falls through */
        case 'minute':
            modified.setSeconds(0);
            /* falls through */
        case 'second':
            modified.setMilliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        setDayOfWeek(modified, 1);
    }

    // quarters are also special
    if (units === 'quarter') {
        setMonth(modified, Math.floor(modified.getMonth() / 3) * 3);
    }

    return modified;
}

export function endOf (date, units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return new Date(date.valueOf());
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    let modified = startOf(date, units);
    modified = add(modified, 1, units);
    modified = subtract(modified, 1, 'ms');
    return modified;
}
