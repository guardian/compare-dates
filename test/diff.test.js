require('@babel/register')({ plugins: ['@babel/plugin-transform-modules-commonjs'] });
const tap = require('tap');
const diff = require('../src/index').diff;

function equal (test, a, b, message) {
    test.ok(Math.abs(a - b) < 0.00000001, '(' + a + ' === ' + b + ') ' + message);
}

tap.test('diff', test => {
    test.equal(diff(new Date(1000), new Date(0)), 1000, '1 second - 0 = 1000');
    test.equal(diff(new Date(1000), new Date(500)), 500, '1 second - 0.5 seconds = 500');
    test.equal(diff(new Date(0), new Date(1000)), -1000, '0 - 1 second = -1000');
    var oneHourDate = new Date(2015, 5, 21),
    nowDate = new Date(+oneHourDate);
    oneHourDate.setHours(oneHourDate.getHours() + 1);
    test.equal(diff(oneHourDate, nowDate), 60 * 60 * 1000, '1 hour from now = 3600000');
    test.done();
});

tap.test('diff key after', test => {
    test.equal(diff(new Date(2010, 0), new Date(2011, 0), 'years'), -1, 'year diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 2), 'months'), -2, 'month diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 7), 'weeks'), 0, 'week diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 8), 'weeks'), -1, 'week diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 21), 'weeks'), -2, 'week diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 22), 'weeks'), -3, 'week diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 4), 'days'), -3, 'day diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 1, 4), 'hours'), -4, 'hour diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 1, 0, 5), 'minutes'), -5, 'minute diff');
    test.equal(diff(new Date(2010, 0), new Date(2010, 0, 1, 0, 0, 6), 'seconds'), -6, 'second diff');
    test.done();
});

tap.test('diff key before', test => {
    test.equal(diff(new Date(2011, 0), new Date(2010, 0), 'years'), 1, 'year diff');
    test.equal(diff(new Date(2010, 2), new Date(2010, 0), 'months'), 2, 'month diff');
    test.equal(diff(new Date(2010, 0, 4), new Date(2010, 0), 'days'), 3, 'day diff');
    test.equal(diff(new Date(2010, 0, 7), new Date(2010, 0), 'weeks'), 0, 'week diff');
    test.equal(diff(new Date(2010, 0, 8), new Date(2010, 0), 'weeks'), 1, 'week diff');
    test.equal(diff(new Date(2010, 0, 21), new Date(2010, 0), 'weeks'), 2, 'week diff');
    test.equal(diff(new Date(2010, 0, 22), new Date(2010, 0), 'weeks'), 3, 'week diff');
    test.equal(diff(new Date(2010, 0, 1, 4), new Date(2010, 0), 'hours'), 4, 'hour diff');
    test.equal(diff(new Date(2010, 0, 1, 0, 5), new Date(2010, 0), 'minutes'), 5, 'minute diff');
    test.equal(diff(new Date(2010, 0, 1, 0, 0, 6), new Date(2010, 0), 'seconds'), 6, 'second diff');
    test.done();
});

tap.test('diff key before singular', test => {
    test.equal(diff(new Date(2011, 0), new Date(2010, 0), 'year'), 1, 'year diff singular');
    test.equal(diff(new Date(2010, 2), new Date(2010, 0), 'month'), 2, 'month diff singular');
    test.equal(diff(new Date(2010, 0, 4), new Date(2010, 0), 'day'), 3, 'day diff singular');
    test.equal(diff(new Date(2010, 0, 7), new Date(2010, 0), 'week'), 0, 'week diff singular');
    test.equal(diff(new Date(2010, 0, 8), new Date(2010, 0), 'week'), 1, 'week diff singular');
    test.equal(diff(new Date(2010, 0, 21), new Date(2010, 0), 'week'), 2, 'week diff singular');
    test.equal(diff(new Date(2010, 0, 22), new Date(2010, 0), 'week'), 3, 'week diff singular');
    test.equal(diff(new Date(2010, 0, 1, 4), new Date(2010, 0), 'hour'), 4, 'hour diff singular');
    test.equal(diff(new Date(2010, 0, 1, 0, 5), new Date(2010, 0), 'minute'), 5, 'minute diff singular');
    test.equal(diff(new Date(2010, 0, 1, 0, 0, 6), new Date(2010, 0), 'second'), 6, 'second diff singular');
    test.done();
});

tap.test('diff key before abbreviated', test => {
    test.equal(diff(new Date(2011, 0), new Date(2010, 0), 'y'), 1, 'year diff abbreviated');
    test.equal(diff(new Date(2010, 2), new Date(2010, 0), 'M'), 2, 'month diff abbreviated');
    test.equal(diff(new Date(2010, 0, 4), new Date(2010, 0), 'd'), 3, 'day diff abbreviated');
    test.equal(diff(new Date(2010, 0, 7), new Date(2010, 0), 'w'), 0, 'week diff abbreviated');
    test.equal(diff(new Date(2010, 0, 8), new Date(2010, 0), 'w'), 1, 'week diff abbreviated');
    test.equal(diff(new Date(2010, 0, 21), new Date(2010, 0), 'w'), 2, 'week diff abbreviated');
    test.equal(diff(new Date(2010, 0, 22), new Date(2010, 0), 'w'), 3, 'week diff abbreviated');
    test.equal(diff(new Date(2010, 0, 1, 4), new Date(2010, 0), 'h'), 4, 'hour diff abbreviated');
    test.equal(diff(new Date(2010, 0, 1, 0, 5), new Date(2010, 0), 'm'), 5, 'minute diff abbreviated');
    test.equal(diff(new Date(2010, 0, 1, 0, 0, 6), new Date(2010, 0), 's'), 6, 'second diff abbreviated');
    test.done();
});

tap.test('diff month', test => {
    test.equal(diff(new Date(2011, 0, 31), new Date(2011, 2, 1), 'months'), -1, 'month diff');
    test.done();
});

tap.test('diff overflow', test => {
    test.equal(diff(new Date(2011, 0), new Date(2010, 0), 'months'), 12, 'month diff');
    test.equal(diff(new Date(2010, 0, 2), new Date(2010, 0), 'hours'), 24, 'hour diff');
    test.equal(diff(new Date(2010, 0, 1, 2), new Date(2010, 0), 'minutes'), 120, 'minute diff');
    test.equal(diff(new Date(2010, 0, 1, 0, 4), new Date(2010, 0), 'seconds'), 240, 'second diff');
    test.done();
});

tap.test('diff floored', test => {
    test.equal(diff(new Date(2010, 0, 1, 23), new Date(2010, 0), 'day'), 0, '23 hours = 0 days');
    test.equal(diff(new Date(2010, 0, 1, 23, 59), new Date(2010, 0), 'day'), 0, '23:59 hours = 0 days');
    test.equal(diff(new Date(2010, 0, 1, 24), new Date(2010, 0), 'day'), 1, '24 hours = 1 day');
    test.equal(diff(new Date(2010, 0, 2), new Date(2011, 0, 1), 'year'), 0, 'year rounded down');
    test.equal(diff(new Date(2011, 0, 1), new Date(2010, 0, 2), 'year'), 0, 'year rounded down');
    test.equal(diff(new Date(2010, 0, 2), new Date(2011, 0, 2), 'year'), -1, 'year rounded down');
    test.equal(diff(new Date(2011, 0, 2), new Date(2010, 0, 2), 'year'), 1, 'year rounded down');
    test.done();
});

tap.test('year diffs include dates', test => {
    test.ok(diff(new Date(2012, 1, 19), new Date(2002, 1, 20), 'years', true) < 10, 'year diff should include date of month');
    test.done();
});

tap.test('month diffs', test => {
    // due to floating point math errors, these tests just need to be accurate within 0.00000001
    test.equal(diff(new Date(2012, 0, 1), new Date(2012, 1, 1), 'months', true), -1, 'Jan 1 to Feb 1 should be 1 month');
    equal(test, diff(new Date(2012, 0, 1), new Date(2012, 0, 1, 12), 'months', true), -0.5 / 31, 'Jan 1 to Jan 1 noon should be 0.5 / 31 months');
    test.equal(diff(new Date(2012, 0, 15), new Date(2012, 1, 15), 'months', true), -1, 'Jan 15 to Feb 15 should be 1 month');
    test.equal(diff(new Date(2012, 0, 28), new Date(2012, 1, 28), 'months', true), -1, 'Jan 28 to Feb 28 should be 1 month');
    test.equal(diff(new Date(2012, 0, 31), new Date(2012, 1, 29), 'months', true), -1, 'Jan 31 to Feb 29 should be 1 month');
    test.ok(-1 > diff(new Date(2012, 0, 31), new Date(2012, 2, 1), 'months', true), 'Jan 31 to Mar 1 should be more than 1 month');
    test.ok(-30 / 28 < diff(new Date(2012, 0, 31), new Date(2012, 2, 1), 'months', true), 'Jan 31 to Mar 1 should be less than 1 month and 1 day');
    equal(test, diff(new Date(2012, 0, 1), new Date(2012, 0, 31), 'months', true), -(30 / 31), 'Jan 1 to Jan 31 should be 30 / 31 months');
    test.ok(0 < diff(new Date(2014, 1, 1), new Date(2014, 0, 31), 'months', true), 'jan-31 to feb-1 diff is positive');
    test.done();
});

tap.test('exact month diffs', test => {
    // generate all pairs of months and compute month diff, with fixed day
    // of month = 15.

    var m1, m2;
    for (m1 = 0; m1 < 12; ++m1) {
        for (m2 = m1; m2 < 12; ++m2) {
            test.equal(diff(new Date(2013, m2, 15), new Date(2013, m1, 15), 'months', true), m2 - m1,
                         'month diff from 2013-' + m1 + '-15 to 2013-' + m2 + '-15');
        }
    }
    test.done();
});

tap.test('year diffs', test => {
    // due to floating point math errors, these tests just need to be accurate within 0.00000001
    equal(test, diff(new Date(2012, 0, 1), new Date(2013, 0, 1), 'years', true), -1, 'Jan 1 2012 to Jan 1 2013 should be 1 year');
    equal(test, diff(new Date(2012, 1, 28), new Date(2013, 1, 28), 'years', true), -1, 'Feb 28 2012 to Feb 28 2013 should be 1 year');
    equal(test, diff(new Date(2012, 2, 1), new Date(2013, 2, 1), 'years', true), -1, 'Mar 1 2012 to Mar 1 2013 should be 1 year');
    equal(test, diff(new Date(2012, 11, 1), new Date(2013, 11, 1), 'years', true), -1, 'Dec 1 2012 to Dec 1 2013 should be 1 year');
    equal(test, diff(new Date(2012, 11, 31), new Date(2013, 11, 31), 'years', true), -1, 'Dec 31 2012 to Dec 31 2013 should be 1 year');
    equal(test, diff(new Date(2012, 0, 1), new Date(2013, 6, 1), 'years', true), -1.5, 'Jan 1 2012 to Jul 1 2013 should be 1.5 years');
    equal(test, diff(new Date(2012, 0, 31), new Date(2013, 6, 31), 'years', true), -1.5, 'Jan 31 2012 to Jul 31 2013 should be 1.5 years');
    equal(test, diff(new Date(2012, 0, 1), new Date(2013, 0, 1, 12), 'years', true), -1 - (0.5 / 31) / 12, 'Jan 1 2012 to Jan 1 2013 noon should be 1+(0.5 / 31) / 12 years');
    equal(test, diff(new Date(2012, 0, 1), new Date(2013, 6, 1, 12), 'years', true), -1.5 - (0.5 / 31) / 12, 'Jan 1 2012 to Jul 1 2013 noon should be 1.5+(0.5 / 31) / 12 years');
    equal(test, diff(new Date(2012, 1, 29), new Date(2013, 1, 28), 'years', true), -1, 'Feb 29 2012 to Feb 28 2013 should be 1-(1 / 28.5) / 12 years');
    test.done();
});

tap.test('negative zero', test => {
    function isNegative (n) {
        return (1 / n) < 0;
    }
    test.ok(!isNegative(diff(new Date(2012, 0, 1), new Date(2012, 0, 1), 'months')), 'month diff on same date is zero, not -0');
    test.ok(!isNegative(diff(new Date(2012, 0, 1), new Date(2012, 0, 1), 'years')), 'year diff on same date is zero, not -0');
    test.ok(!isNegative(diff(new Date(2012, 0, 1), new Date(2012, 0, 1), 'quarters')), 'quarter diff on same date is zero, not -0');
    test.ok(!isNegative(diff(new Date(2012, 0, 1), new Date(2012, 0, 1, 1), 'days')), 'days diff on same date is zero, not -0');
    test.ok(!isNegative(diff(new Date(2012, 0, 1), new Date(2012, 0, 1, 0, 1), 'hours')), 'hour diff on same hour is zero, not -0');
    test.ok(!isNegative(diff(new Date(2012, 0, 1), new Date(2012, 0, 1, 0, 0, 1), 'minutes')), 'minute diff on same minute is zero, not -0');
    test.ok(!isNegative(diff(new Date(2012, 0, 1), new Date(2012, 0, 1, 0, 0, 0, 1), 'seconds')), 'second diff on same second is zero, not -0');
    test.done();
});
