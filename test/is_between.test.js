require('babel-register')({ plugins: ['transform-es2015-modules-commonjs', 'babel-plugin-transform-es2015-spread', 'babel-plugin-transform-es2015-parameters'] });
const tap = require('tap');
const isBetween = require('../src/index').isBetween;

tap.test('throw on invalid dates', test => {
    test.throws(() => isBetween('invalid', new Date(), new Date()), /invalid date/i, 'first');
    test.throws(() => isBetween(new Date(), 'invalid', new Date()), /invalid date/i, 'second');
    test.throws(() => isBetween(new Date(), new Date(), 'invalid', null, '[]'), /invalid date/i, 'third');
    test.done();
});

tap.test('is between without units', test => {
    const d = new Date(2011, 3, 2, 3, 4, 5, 10);
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10)), false, 'year is later');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2013, 3, 2, 3, 4, 5, 10)), false, 'year is earlier');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10)), true, 'year is between');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10)), false, 'month is later');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 5, 2, 3, 4, 5, 10)), false, 'month is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 2, 2, 3, 4, 5, 10),
        new Date(2011, 4, 2, 3, 4, 5, 10)), true, 'month is between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 1, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10)), false, 'day is later');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 4, 3, 4, 5, 10)), false, 'day is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 1, 3, 4, 5, 10),
        new Date(2011, 3, 3, 3, 4, 5, 10)), true, 'day is between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 1, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10)), false, 'hour is later');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 5, 4, 5, 10)), false, 'hour is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 2, 4, 5, 10),
        new Date(2011, 3, 2, 4, 4, 5, 10)), true, 'hour is between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 6, 5, 10)), false, 'minute is later');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 2, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10)), false, 'minute is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 3, 5, 10),
        new Date(2011, 3, 2, 3, 5, 5, 10)), true, 'minute is between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 7, 10)), false, 'second is later');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 3, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10)), false, 'second is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 4, 10),
        new Date(2011, 3, 2, 3, 4, 6, 10)), true, 'second is between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 12)), false, 'millisecond is later');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 8),
        new Date(2011, 3, 2, 3, 4, 5, 10)), false, 'millisecond is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 9),
        new Date(2011, 3, 2, 3, 4, 5, 11)), true, 'millisecond is between');
    test.equal(isBetween(d, d, d), false, 'moments are not between themselves');
    test.done();
});

tap.test('is between without units inclusivity', test => {
    var d = new Date(2011, 3, 2, 3, 4, 5, 10);
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '()'), false, 'start and end are excluded, start is equal to moment');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '()'), false, 'start and end are excluded, end is equal to moment');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '()'), true, 'start and end are excluded, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), null, '()'), false, 'start and end are excluded, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '()'), false, 'start and end are excluded, should fail on same start/end date.');

    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '(]'), false, 'start is excluded and end is included should fail on same start date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '(]'), true, 'start is excluded and end is included should succeed on end date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '(]'), true, 'start is excluded and end is included, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), null, '(]'), false, 'start is excluded and end is included, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '(]'), false, 'start is excluded and end is included, should fail on same start/end date.');

    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '[)'), true, 'start is included and end is excluded should succeed on same start date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '[)'), false, 'start is included and end is excluded should fail on same end date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '[)'), true, 'start is included and end is excluded, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), null, '[)'), false, 'start is included and end is excluded, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '[)'), false, 'start is included and end is excluded, should fail on same end and start date');

    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '[]'), true, 'start and end inclusive should succeed on same start date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '[]'), true, 'start and end inclusive should succeed on same end date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), null, '[]'), true, 'start and end inclusive, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), null, '[]'), false, 'start and end inclusive, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), null, '[]'), true, 'start and end inclusive, should handle same end and start date');
    test.done();
});

tap.test('is between milliseconds inclusivity', test => {
    var d = new Date(2011, 3, 2, 3, 4, 5, 10);
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds'), true, 'options, no inclusive');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '()'), false, 'start and end are excluded, start is equal to moment');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '()'), false, 'start and end are excluded, end is equal to moment');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '()'), true, 'start and end are excluded, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), 'milliseconds', '()'), false, 'start and end are excluded, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '()'), false, 'start and end are excluded, should fail on same start/end date.');

    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '(]'), false, 'start is excluded and end is included should fail on same start date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '(]'), true, 'start is excluded and end is included should succeed on end date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '(]'), true, 'start is excluded and end is included, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), 'milliseconds', '(]'), false, 'start is excluded and end is included, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '(]'), false, 'start is excluded and end is included, should fail on same start/end date.');

    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '[)'), true, 'start is included and end is excluded should succeed on same start date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '[)'), false, 'start is included and end is excluded should fail on same end date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '[)'), true, 'start is included and end is excluded, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), 'milliseconds', '[)'), false, 'start is included and end is excluded, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '[)'), false, 'start is included and end is excluded, should fail on same end and start date');

    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '[]'), true, 'start and end inclusive should succeed on same start date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '[]'), true, 'start and end inclusive should succeed on same end date');
    test.equal(isBetween(
        d,
        new Date(2010, 3, 2, 3, 4, 5, 10),
        new Date(2012, 3, 2, 3, 4, 5, 10), 'milliseconds', '[]'), true, 'start and end inclusive, is between');
    test.equal(isBetween(
        d,
        new Date(2009, 3, 2, 3, 4, 5, 10),
        new Date(2010, 3, 2, 3, 4, 5, 10), 'milliseconds', '[]'), false, 'start and end inclusive, is not between');
    test.equal(isBetween(
        d,
        new Date(2011, 3, 2, 3, 4, 5, 10),
        new Date(2011, 3, 2, 3, 4, 5, 10), 'milliseconds', '[]'), true, 'start and end inclusive, should handle same end and start date');
    test.done();
});

tap.test('is between year', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isBetween(
        d,
        new Date(2011, 5, 6, 7, 8, 9, 10),
        new Date(2011, 5, 6, 7, 8, 9, 10), 'year'), false, 'year match');
    test.equal(isBetween(
        d,
        new Date(2010, 5, 6, 7, 8, 9, 10),
        new Date(2012, 5, 6, 7, 8, 9, 10), 'years'), true, 'plural should work');
    test.equal(isBetween(
        d,
        new Date(2010, 5, 6, 7, 8, 9, 10),
        new Date(2012, 5, 6, 7, 8, 9, 10), 'year'), true, 'year is between');
    test.equal(isBetween(
        d,
        new Date(2011, 5, 6, 7, 8, 9, 10),
        new Date(2013, 5, 6, 7, 8, 9, 10), 'year'), false, 'year is earlier');
    test.equal(isBetween(
        d,
        new Date(2010, 5, 6, 7, 8, 9, 10),
        new Date(2011, 5, 6, 7, 8, 9, 10), 'year'), false, 'year is later');
    test.equal(isBetween(d, d, 'year'), false, 'sam are not between the same year');
    test.done();
});

tap.test('is between month', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isBetween(
        d,
        new Date(2011, 1, 6, 7, 8, 9, 10),
        new Date(2011, 1, 6, 7, 8, 9, 10), 'month'), false, 'month match');
    test.equal(isBetween(
        d,
        new Date(2011, 0, 6, 7, 8, 9, 10),
        new Date(2011, 2, 6, 7, 8, 9, 10), 'months'), true, 'plural should work');
    test.equal(isBetween(
        d,
        new Date(2011, 0, 31, 23, 59, 59, 999),
        new Date(2011, 2, 1, 0, 0, 0, 0), 'month'), true, 'month is between');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 6, 7, 8, 9, 10),
        new Date(2011, 2, 6, 7, 8, 9, 10), 'month'), false, 'month is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 11, 6, 7, 8, 9, 10),
        new Date(2011, 1, 6, 7, 8, 9, 10), 'month'), false, 'month is later');
    test.equal(isBetween(d, d, 'month'), false, 'sam are not between the same month');
    test.done();
});

tap.test('is between day', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 7, 8, 9, 10),
        new Date(2011, 1, 2, 7, 8, 9, 10), 'day'), false, 'day match');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 1, 7, 8, 9, 10),
        new Date(2011, 1, 3, 7, 8, 9, 10), 'days'), true, 'plural should work');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 1, 7, 8, 9, 10),
        new Date(2011, 1, 3, 7, 8, 9, 10), 'day'), true, 'day is between');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 7, 8, 9, 10),
        new Date(2011, 1, 4, 7, 8, 9, 10), 'day'), false, 'day is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 1, 7, 8, 9, 10),
        new Date(2011, 1, 2, 7, 8, 9, 10), 'day'), false, 'day is later');
    test.equal(isBetween(d, d, 'day'), false, 'sam are not between the same day');
    test.done();
});

tap.test('is between hour', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 5, 9, 10),
        new Date(2011, 1, 2, 3, 9, 9, 10), 'hour'), false, 'hour match');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 1, 59, 59, 999),
        new Date(2011, 1, 2, 4, 0, 0, 0), 'hours'), true, 'plural should work');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 2, 59, 59, 999),
        new Date(2011, 1, 2, 4, 0, 0, 0), 'hour'), true, 'hour is between');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 7, 8, 9, 10),
        new Date(2011, 1, 2, 7, 8, 9, 10), 'hour'), false, 'hour is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 7, 8, 9, 10),
        new Date(2011, 1, 2, 7, 8, 9, 10), 'hour'), false, 'hour is later');
    test.equal(isBetween(d, d, 'hour'), false, 'sam are not between the same hour');
    test.done();
});

tap.test('is between minute', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 9, 10),
        new Date(2011, 1, 2, 3, 4, 9, 10), 'minute'), false, 'minute match');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 3, 9, 10),
        new Date(2011, 1, 2, 3, 5, 9, 10), 'minutes'), true, 'plural should work');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 3, 59, 999),
        new Date(2011, 1, 2, 3, 5, 0, 0), 'minute'), true, 'minute is between');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 5, 0, 0),
        new Date(2011, 1, 2, 3, 8, 9, 10), 'minute'), false, 'minute is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 2, 9, 10),
        new Date(2011, 1, 2, 3, 3, 59, 999), 'minute'), false, 'minute is later');
    test.equal(isBetween(d, d, 'minute'), false, 'sam are not between the same minute');
    test.done();
});

tap.test('is between second', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 5, 10),
        new Date(2011, 1, 2, 3, 4, 5, 10), 'second'), false, 'second match');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 4, 10),
        new Date(2011, 1, 2, 3, 4, 6, 10), 'seconds'), true, 'plural should work');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 4, 999),
        new Date(2011, 1, 2, 3, 4, 6, 0), 'second'), true, 'second is between');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 6, 0),
        new Date(2011, 1, 2, 3, 4, 7, 10), 'second'), false, 'second is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 3, 10),
        new Date(2011, 1, 2, 3, 4, 4, 999), 'second'), false, 'second is later');
    test.equal(isBetween(d, d, 'second'), false, 'sam are not between the same second');
    test.done();
});

tap.test('is between millisecond', test => {
    var d = new Date(2011, 1, 2, 3, 4, 5, 6);
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 5, 6),
        new Date(2011, 1, 2, 3, 4, 5, 6), 'millisecond'), false, 'millisecond match');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 5, 5),
        new Date(2011, 1, 2, 3, 4, 5, 7), 'milliseconds'), true, 'plural should work');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 5, 5),
        new Date(2011, 1, 2, 3, 4, 5, 7), 'millisecond'), true, 'millisecond is between');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 5, 7),
        new Date(2011, 1, 2, 3, 4, 5, 10), 'millisecond'), false, 'millisecond is earlier');
    test.equal(isBetween(
        d,
        new Date(2011, 1, 2, 3, 4, 5, 4),
        new Date(2011, 1, 2, 3, 4, 5, 6), 'millisecond'), false, 'millisecond is later');
    test.equal(isBetween(d, d, 'millisecond'), false, 'same moments are not between the same millisecond');
    test.done();
});
