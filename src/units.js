const aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

addUnitAlias('month', 'M');
addUnitAlias('year', 'y');
addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');
addUnitAlias('quarter', 'Q');
addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');
addUnitAlias('date', 'D');
addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');
addUnitAlias('dayOfYear', 'DDD');
addUnitAlias('hour', 'h');
addUnitAlias('minute', 'm');
addUnitAlias('second', 's');
addUnitAlias('millisecond', 'ms');

export function normalizeUnits (units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}
