require('babel-register')({ plugins: ['transform-es2015-modules-commonjs'] });
const tap = require('tap');
const daysInMonth = require('../src/setters').daysInMonth;

tap.test('days in month', test => {
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].forEach((days, i) => {
        var firstDay = new Date(2012, i),
            lastDay  = new Date(2012, i, days);
        test.equal(daysInMonth(firstDay.getFullYear(), firstDay.getMonth()), days, firstDay + ' should have ' + days + ' days.');
        test.equal(daysInMonth(lastDay.getFullYear(), lastDay.getMonth()), days, lastDay + ' should have ' + days + ' days.');
    });
    test.done();
});

tap.test('days in month leap years', test => {
    test.equal(daysInMonth(2010, 1), 28, 'Feb 2010 should have 28 days');
    test.equal(daysInMonth(2100, 1), 28, 'Feb 2100 should have 28 days');
    test.equal(daysInMonth(2008, 1), 29, 'Feb 2008 should have 29 days');
    test.equal(daysInMonth(2000, 1), 29, 'Feb 2000 should have 29 days');
    test.done();
});
