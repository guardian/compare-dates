require('@babel/register')({ plugins: ['@babel/plugin-transform-modules-commonjs'] });
const tap = require('tap');
const isSameOrBefore = require('../src/index').isSameOrBefore;

tap.test('throw on invalid dates', test => {
    test.throws(() => isSameOrBefore(new Date('nothing'), new Date()), /invalid date/i);
    test.throws(() => isSameOrBefore(new Date(), new Date('wrong')), /invalid date/i);
    test.done();
});

tap.test('is same or before without units', test => {
    const d = new Date(2011, 3, 2, 3, 4, 5, 10);
    test.equal(isSameOrBefore(d, new Date(2012, 3, 2, 3, 5, 5, 10)), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 3, 2, 3, 3, 5, 10)), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 4, 2, 3, 4, 5, 10)), true, 'month is later');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 2, 3, 4, 5, 10)), false, 'month is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 3, 3, 4, 5, 10)), true, 'day is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 1, 3, 4, 5, 10)), false, 'day is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 4, 4, 5, 10)), true, 'hour is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 2, 4, 5, 10)), false, 'hour is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 5, 5, 10)), true, 'minute is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 3, 5, 10)), false, 'minute is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 6, 10)), true, 'second is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 4, 11)), false, 'second is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 5, 10)), true, 'millisecond match');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 5, 11)), true, 'millisecond is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 5, 9)), false, 'millisecond is earlier');
    test.equal(isSameOrBefore(d, d), true, 'd,  are the same as themselves');
    test.done();
});

tap.test('is same or before year', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isSameOrBefore(d, new Date(2011, 5, 6, 7, 8, 9, 10), 'year'), true, 'year match');
    test.equal(isSameOrBefore(d, new Date(2011, 5, 6, 7, 8, 9, 10), 'years'), true, 'plural should work');
    test.equal(isSameOrBefore(d, new Date(2012, 5, 6, 7, 8, 9, 10), 'year'), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 5, 6, 7, 8, 9, 10), 'year'), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 0, 1, 0, 0, 0, 0), 'year'), true, 'exact start of year');
    test.equal(isSameOrBefore(d, new Date(2011, 11, 31, 23, 59, 59, 999), 'year'), true, 'exact end of year');
    test.equal(isSameOrBefore(d, new Date(2012, 0, 1, 0, 0, 0, 0), 'year'), true, 'start of next year');
    test.equal(isSameOrBefore(d, new Date(2010, 11, 31, 23, 59, 59, 999), 'year'), false, 'end of previous year');
    test.equal(isSameOrBefore(d, d, 'year'), true, 'same moments are in the same year');
    test.done();
});

tap.test('is same or before month', test => {
    var d = new Date(2011, 2, 3, 4, 5, 6, 7);
    test.equal(isSameOrBefore(d, new Date(2011, 2, 6, 7, 8, 9, 10), 'month'), true, 'month match');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 6, 7, 8, 9, 10), 'months'), true, 'plural should work');
    test.equal(isSameOrBefore(d, new Date(2012, 2, 6, 7, 8, 9, 10), 'month'), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 2, 6, 7, 8, 9, 10), 'month'), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 5, 6, 7, 8, 9, 10), 'month'), true, 'month is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 6, 7, 8, 9, 10), 'month'), false, 'month is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 1, 0, 0, 0, 0), 'month'), true, 'exact start of month');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 31, 23, 59, 59, 999), 'month'), true, 'exact end of month');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 1, 0, 0, 0, 0), 'month'), true, 'start of next month');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 27, 23, 59, 59, 999), 'month'), false, 'end of previous month');
    test.equal(isSameOrBefore(d, d, 'month'), true, 'same moments are in the same month');
    test.done();
});

tap.test('is same or before day', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 7, 8, 9, 10), 'day'), true, 'day match');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 7, 8, 9, 10), 'days'), true, 'plural should work');
    test.equal(isSameOrBefore(d, new Date(2012, 1, 2, 7, 8, 9, 10), 'day'), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 1, 2, 7, 8, 9, 10), 'day'), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 2, 7, 8, 9, 10), 'day'), true, 'month is later');
    test.equal(isSameOrBefore(d, new Date(2010, 12, 2, 7, 8, 9, 10), 'day'), false, 'month is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 3, 7, 8, 9, 10), 'day'), true, 'day is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 1, 7, 8, 9, 10), 'day'), false, 'day is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 0, 0, 0, 0), 'day'), true, 'exact start of day');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 23, 59, 59, 999), 'day'), true, 'exact end of day');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 3, 0, 0, 0, 0), 'day'), true, 'start of next day');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 1, 23, 59, 59, 999), 'day'), false, 'end of previous day');
    test.equal(isSameOrBefore(d, d, 'day'), true, 'same moments are in the same day');
    test.done();
});

tap.test('is same or before hour', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 8, 9, 10), 'hour'), true, 'hour match');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 8, 9, 10), 'hours'), true, 'plural should work');
    test.equal(isSameOrBefore(d, new Date(2012, 1, 2, 3, 8, 9, 10), 'hour'), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 1, 2, 3, 8, 9, 10), 'hour'), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 2, 3, 8, 9, 10), 'hour'), true, 'month is later');
    test.equal(isSameOrBefore(d, new Date(2010, 12, 2, 3, 8, 9, 10), 'hour'), false, 'month is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 3, 3, 8, 9, 10), 'hour'), true, 'day is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 1, 3, 8, 9, 10), 'hour'), false, 'day is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 4, 8, 9, 10), 'hour'), true, 'hour is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 2, 8, 9, 10), 'hour'), false, 'hour is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 0, 0, 0), 'hour'), true, 'exact start of hour');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 59, 59, 999), 'hour'), true, 'exact end of hour');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 4, 0, 0, 0), 'hour'), true, 'start of next hour');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 2, 59, 59, 999), 'hour'), false, 'end of previous hour');
    test.equal(isSameOrBefore(d, d, 'hour'), true, 'same moments are in the same hour');
    test.done();
});

tap.test('is same or before minute', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 9, 10), 'minute'), true, 'minute match');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 9, 10), 'minutes'), true, 'plural should work');
    test.equal(isSameOrBefore(d, new Date(2012, 1, 2, 3, 4, 9, 10), 'minute'), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 1, 2, 3, 4, 9, 10), 'minute'), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 2, 3, 4, 9, 10), 'minute'), true, 'month is later');
    test.equal(isSameOrBefore(d, new Date(2010, 12, 2, 3, 4, 9, 10), 'minute'), false, 'month is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 3, 3, 4, 9, 10), 'minute'), true, 'day is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 1, 3, 4, 9, 10), 'minute'), false, 'day is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 4, 4, 9, 10), 'minute'), true, 'hour is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 2, 4, 9, 10), 'minute'), false, 'hour is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 5, 9, 10), 'minute'), true, 'minute is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 3, 9, 10), 'minute'), false, 'minute is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 0, 0), 'minute'), true, 'exact start of minute');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 59, 999), 'minute'), true, 'exact end of minute');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 5, 0, 0), 'minute'), true, 'start of next minute');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 3, 59, 999), 'minute'), false, 'end of previous minute');
    test.equal(isSameOrBefore(d, d, 'minute'), true, 'same moments are in the same minute');
    test.done();
});

tap.test('is same or before second', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 5, 10), 'second'), true, 'second match');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 5, 10), 'seconds'), true, 'plural should work');
    test.equal(isSameOrBefore(d, new Date(2012, 1, 2, 3, 4, 5, 10), 'second'), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 1, 2, 3, 4, 5, 10), 'second'), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 2, 3, 4, 5, 10), 'second'), true, 'month is later');
    test.equal(isSameOrBefore(d, new Date(2010, 12, 2, 3, 4, 5, 10), 'second'), false, 'month is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 3, 3, 4, 5, 10), 'second'), true, 'day is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 1, 3, 4, 5, 10), 'second'), false, 'day is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 4, 4, 5, 10), 'second'), true, 'hour is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 2, 4, 5, 10), 'second'), false, 'hour is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 5, 5, 10), 'second'), true, 'minute is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 3, 5, 10), 'second'), false, 'minute is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 6, 10), 'second'), true, 'second is later');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 4, 10), 'second'), false, 'second is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 5, 0), 'second'), true, 'exact start of second');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 5, 999), 'second'), true, 'exact end of second');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 6, 0), 'second'), true, 'start of next second');
    test.equal(isSameOrBefore(d, new Date(2011, 1, 2, 3, 4, 4, 999), 'second'), false, 'end of previous second');
    test.equal(isSameOrBefore(d, d, 'second'), true, 'same moments are in the same second');
    test.done();
});

tap.test('is same or before millisecond', test => {
    var d = new Date(2011, 3, 2, 3, 4, 5, 10);
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 5, 10), 'millisecond'), true, 'millisecond match');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds'), true, 'plural should work');
    test.equal(isSameOrBefore(d, new Date(2012, 3, 2, 3, 4, 5, 10), 'millisecond'), true, 'year is later');
    test.equal(isSameOrBefore(d, new Date(2010, 3, 2, 3, 4, 5, 10), 'millisecond'), false, 'year is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 4, 2, 3, 4, 5, 10), 'millisecond'), true, 'month is later');
    test.equal(isSameOrBefore(d, new Date(2011, 2, 2, 3, 4, 5, 10), 'millisecond'), false, 'month is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 3, 3, 4, 5, 10), 'millisecond'), true, 'day is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 1, 1, 4, 5, 10), 'millisecond'), false, 'day is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 4, 4, 5, 10), 'millisecond'), true, 'hour is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 1, 4, 1, 5, 10), 'millisecond'), false, 'hour is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 5, 5, 10), 'millisecond'), true, 'minute is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 3, 5, 10), 'millisecond'), false, 'minute is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 6, 10), 'millisecond'), true, 'second is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 4, 5), 'millisecond'), false, 'second is earlier');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 6, 11), 'millisecond'), true, 'millisecond is later');
    test.equal(isSameOrBefore(d, new Date(2011, 3, 2, 3, 4, 4, 9), 'millisecond'), false, 'millisecond is earlier');
    test.equal(isSameOrBefore(d, d, 'millisecond'), true, 'same moments are in the same millisecond');
    test.done();
});
