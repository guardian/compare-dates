require('@babel/register')({ plugins: ['@babel/plugin-transform-modules-commonjs'] });
const tap = require('tap');
const min = require('../src/index').min;
const max = require('../src/index').max;
const add = require('../src/setters').add;
const subtract = require('../src/setters').subtract;

tap.test('min', test => {
    var now = new Date(),
        future = add(now, 1, 'month'),
        past = subtract(now, 1, 'month'),
        invalid = 'invalid';

    test.equal(min(now, future, past), past, 'min(now, future, past)');
    test.equal(min(future, now, past), past, 'min(future, now, past)');
    test.equal(min(future, past, now), past, 'min(future, past, now)');
    test.equal(min(past, future, now), past, 'min(past, future, now)');
    test.equal(min(now, past), past, 'min(now, past)');
    test.equal(min(past, now), past, 'min(past, now)');
    test.equal(min(now), now, 'min(now, past)');

    test.throws(() => min(now, invalid), /invalid date/i, 'min(now, invalid)');
    test.throws(() => min(invalid, now), /invalid date/i, 'min(invalid, now)');
    test.done();
});

tap.test('max', test => {
    var now = new Date(),
        future = add(now, 1, 'month'),
        past = subtract(now, 1, 'month'),
        invalid = 'invalid';

    test.equal(max(now, future, past), future, 'max(now, future, past)');
    test.equal(max(future, now, past), future, 'max(future, now, past)');
    test.equal(max(future, past, now), future, 'max(future, past, now)');
    test.equal(max(past, future, now), future, 'max(past, future, now)');
    test.equal(max(now, past), now, 'max(now, past)');
    test.equal(max(past, now), now, 'max(past, now)');
    test.equal(max(now), now, 'max(now, past)');

    test.throws(() => max(now, invalid), /invalid date/i, 'max(now, invalid)');
    test.throws(() => max(invalid, now), /invalid date/i, 'max(invalid, now)');
    test.done();
});
