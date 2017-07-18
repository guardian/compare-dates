require('babel-register')({ plugins: ['transform-es2015-modules-commonjs'] });
const tap = require('tap');
const startOf = require('../src/start-end-of').startOf;
const endOf = require('../src/start-end-of').endOf;

tap.test('start of year', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'year'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'years'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'y');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 0, 'strip out the month');
    test.equal(m.getDate(), 1, 'strip out the day');
    test.equal(m.getHours(), 0, 'strip out the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of year', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'year'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'years'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'y');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 11, 'set the month');
    test.equal(m.getDate(), 31, 'set the day');
    test.equal(m.getHours(), 23, 'set the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});

tap.test('start of quarter', test => {
    var m = startOf(new Date(2011, 4, 2, 3, 4, 5, 6), 'quarter'),
        ms = startOf(new Date(2011, 4, 2, 3, 4, 5, 6), 'quarters'),
        ma = startOf(new Date(2011, 4, 2, 3, 4, 5, 6), 'Q');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 3, 'strip out the month');
    test.equal(m.getDate(), 1, 'strip out the day');
    test.equal(m.getHours(), 0, 'strip out the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of quarter', test => {
    var m = endOf(new Date(2011, 4, 2, 3, 4, 5, 6), 'quarter'),
        ms = endOf(new Date(2011, 4, 2, 3, 4, 5, 6), 'quarters'),
        ma = endOf(new Date(2011, 4, 2, 3, 4, 5, 6), 'Q');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 5, 'set the month');
    test.equal(m.getDate(), 30, 'set the day');
    test.equal(m.getHours(), 23, 'set the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});

tap.test('start of month', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'month'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'months'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'M');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 1, 'strip out the day');
    test.equal(m.getHours(), 0, 'strip out the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of month', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'month'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'months'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'M');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 28, 'set the day');
    test.equal(m.getHours(), 23, 'set the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});

tap.test('start of week', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'week'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'weeks'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'w');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 0, 'rolls back to January');
    test.equal(m.getDate(), 31, 'set correct date');
    test.equal(m.getHours(), 0, 'strip out the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of week', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'week'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'weeks'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'weeks');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 6, 'set the day');
    test.equal(m.getHours(), 23, 'set the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});
/*
tap.test('start of iso-week', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'isoWeek'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'isoWeeks'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'W');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 0, 'rollback to January');
    test.equal(m.isoWeekday(), 1, 'set day of iso-week');
    test.equal(m.getDate(), 31, 'set correct date');
    test.equal(m.getHours(), 0, 'strip out the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of iso-week', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'isoWeek'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'isoWeeks'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'W');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.isoWeekday(), 7, 'set the day of the week');
    test.equal(m.getDate(), 6, 'set the day');
    test.equal(m.getHours(), 23, 'set the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});
*/
tap.test('start of day', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'day'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'days'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'd');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 0, 'strip out the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of day', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'day'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'days'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'd');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 23, 'set the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});

tap.test('start of date', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'date'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'dates');

    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 0, 'strip out the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of date', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'date'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'dates');

    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 23, 'set the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});


tap.test('start of hour', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'hour'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'hours'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'h');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 3, 'keep the hours');
    test.equal(m.getMinutes(), 0, 'strip out the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of hour', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'hour'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'hours'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'h');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 3, 'keep the hours');
    test.equal(m.getMinutes(), 59, 'set the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});

tap.test('start of minute', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'minute'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'minutes'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'm');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 3, 'keep the hours');
    test.equal(m.getMinutes(), 4, 'keep the minutes');
    test.equal(m.getSeconds(), 0, 'strip out the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of minute', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'minute'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'minutes'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'm');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 3, 'keep the hours');
    test.equal(m.getMinutes(), 4, 'keep the minutes');
    test.equal(m.getSeconds(), 59, 'set the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});

tap.test('start of second', test => {
    var m = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'second'),
        ms = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'seconds'),
        ma = startOf(new Date(2011, 1, 2, 3, 4, 5, 6), 's');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 3, 'keep the hours');
    test.equal(m.getMinutes(), 4, 'keep the minutes');
    test.equal(m.getSeconds(), 5, 'keep the the seconds');
    test.equal(m.getMilliseconds(), 0, 'strip out the milliseconds');
    test.done();
});

tap.test('end of second', test => {
    var m = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'second'),
        ms = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 'seconds'),
        ma = endOf(new Date(2011, 1, 2, 3, 4, 5, 6), 's');
    test.equal(+m, +ms, 'Plural or singular should work');
    test.equal(+m, +ma, 'Full or abbreviated should work');
    test.equal(m.getFullYear(), 2011, 'keep the year');
    test.equal(m.getMonth(), 1, 'keep the month');
    test.equal(m.getDate(), 2, 'keep the day');
    test.equal(m.getHours(), 3, 'keep the hours');
    test.equal(m.getMinutes(), 4, 'keep the minutes');
    test.equal(m.getSeconds(), 5, 'keep the seconds');
    test.equal(m.getMilliseconds(), 999, 'set the seconds');
    test.done();
});

tap.test('endOf millisecond and no-arg', test => {
    var m = new Date();
    test.equal(+m, +endOf(m), 'endOf without argument should change time');
    test.equal(+m, +endOf(m, 'ms'), 'endOf with ms argument should change time');
    test.equal(+m, +endOf(m, 'millisecond'), 'endOf with millisecond argument should change time');
    test.equal(+m, +endOf(m, 'milliseconds'), 'endOf with milliseconds argument should change time');
    test.done();
});
