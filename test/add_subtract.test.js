require('@babel/register')({ plugins: ['@babel/plugin-transform-modules-commonjs'] });
const tap = require('tap');
const add = require('../src/setters').add;
const subtract = require('../src/setters').subtract;

tap.test('add short reverse args', test => {
    var a = new Date(2011, 9, 12, 6, 7, 8, 500), b, c, d;

    test.equal(add(a, 50, 'ms').getMilliseconds(), 550, 'Add milliseconds');
    test.equal(add(a, 1, 's').getSeconds(), 9, 'Add seconds');
    test.equal(add(a, 1, 'm').getMinutes(), 8, 'Add minutes');
    test.equal(add(a, 1, 'h').getHours(), 7, 'Add hours');
    test.equal(add(a, 1, 'd').getDate(), 13, 'Add date');
    test.equal(add(a, 1, 'w').getDate(), 19, 'Add week');
    test.equal(add(a, 1, 'M').getMonth(), 10, 'Add month');
    test.equal(add(a, 1, 'y').getFullYear(), 2012, 'Add year');
    test.equal(add(a, 1, 'Q').getMonth(), 0, 'Add quarter');

    b = add(new Date(2010, 0, 31), 1, 'M');
    c = subtract(new Date(2010, 1, 28), 1, 'M');
    d = subtract(new Date(2010, 1, 28), 1, 'Q');

    test.equal(b.getMonth(), 1, 'add month, jan 31st to feb 28th');
    test.equal(b.getDate(), 28, 'add month, jan 31st to feb 28th');
    test.equal(c.getMonth(), 0, 'subtract month, feb 28th to jan 28th');
    test.equal(c.getDate(), 28, 'subtract month, feb 28th to jan 28th');
    test.equal(d.getMonth(), 10, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
    test.equal(d.getDate(), 28, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
    test.equal(d.getFullYear(), 2009, 'subtract quarter, feb 28th 2010 to nov 28th 2009');
    test.done();
});

tap.test('add long reverse args', test => {
    var a = new Date(2011, 9, 12, 6, 7, 8, 500);

    test.equal(add(a, 50, 'milliseconds').getMilliseconds(), 550, 'Add milliseconds');
    test.equal(add(a, 1, 'seconds').getSeconds(), 9, 'Add seconds');
    test.equal(add(a, 1, 'minutes').getMinutes(), 8, 'Add minutes');
    test.equal(add(a, 1, 'hours').getHours(), 7, 'Add hours');
    test.equal(add(a, 1, 'days').getDate(), 13, 'Add date');
    test.equal(add(a, 1, 'weeks').getDate(), 19, 'Add week');
    test.equal(add(a, 1, 'months').getMonth(), 10, 'Add month');
    test.equal(add(a, 1, 'years').getFullYear(), 2012, 'Add year');
    test.equal(add(a, 1, 'quarters').getMonth(), 0, 'Add quarter');
    test.done();
});

tap.test('add long singular reverse args', test => {
    var a = new Date(2011, 9, 12, 6, 7, 8, 500);

    test.equal(add(a, 50, 'millisecond').getMilliseconds(), 550, 'Add milliseconds');
    test.equal(add(a, 1, 'second').getSeconds(), 9, 'Add seconds');
    test.equal(add(a, 1, 'minute').getMinutes(), 8, 'Add minutes');
    test.equal(add(a, 1, 'hour').getHours(), 7, 'Add hours');
    test.equal(add(a, 1, 'day').getDate(), 13, 'Add date');
    test.equal(add(a, 1, 'week').getDate(), 19, 'Add week');
    test.equal(add(a, 1, 'month').getMonth(), 10, 'Add month');
    test.equal(add(a, 1, 'year').getFullYear(), 2012, 'Add year');
    test.equal(add(a, 1, 'quarter').getMonth(), 0, 'Add quarter');
    test.done();
});

tap.test('add no string with milliseconds default', test => {
    var a = new Date(2011, 9, 12, 6, 7, 8, 500);

    test.equal(add(a, 50).getMilliseconds(), 550, 'Add milliseconds');
    test.done();
});

tap.test('subtract strings string short', test => {
    var a = new Date(2011, 9, 12, 6, 7, 8, 500);

    test.equal(subtract(a, 50, 'ms').getMilliseconds(), 450, 'Subtract milliseconds');
    test.equal(subtract(a, 1, 's').getSeconds(), 7, 'Subtract seconds');
    test.equal(subtract(a, 1, 'm').getMinutes(), 6, 'Subtract minutes');
    test.equal(subtract(a, 1, 'h').getHours(), 5, 'Subtract hours');
    test.equal(subtract(a, 1, 'd').getDate(), 11, 'Subtract date');
    test.equal(subtract(a, 1, 'w').getDate(), 5, 'Subtract week');
    test.equal(subtract(a, 1, 'M').getMonth(), 8, 'Subtract month');
    test.equal(subtract(a, 1, 'y').getFullYear(), 2010, 'Subtract year');
    test.equal(subtract(a, 1, 'Q').getMonth(), 6, 'Subtract quarter');
    test.done();
});

tap.test('add decimal values of days and months', test => {
    test.equal(add(new Date(2016,3,3), 1.5, 'days').getDate(), 5, 'adding 1.5 days is rounded to adding 2 day');
    test.equal(add(new Date(2016,3,3), -1.5, 'days').getDate(), 1, 'adding -1.5 days is rounded to adding -2 day');
    test.equal(add(new Date(2016,3,1), -1.5, 'days').getDate(), 30, 'adding -1.5 days on first of month wraps around');
    test.equal(add(new Date(2016,3,3), 1.5, 'months').getMonth(), 5, 'adding 1.5 months adds 2 months');
    test.equal(add(new Date(2016,3,3), -1.5, 'months').getMonth(), 1, 'adding -1.5 months adds -2 months');
    test.equal(add(new Date(2016,0,3), -1.5, 'months').getMonth(), 10, 'adding -1.5 months at start of year wraps back');
    test.equal(subtract(new Date(2016,3,3), 1.5, 'days').getDate(),1, 'subtract 1.5 days is rounded to subtract 2 day');
    test.equal(subtract(new Date(2016,3,2), 1.5, 'days').getDate(), 31, 'subtract 1.5 days subtracts 2 days');
    test.equal(subtract(new Date(2016,1,1), 1.1, 'days').getDate(), 31, 'subtract 1.1 days wraps to previous month');
    test.equal(subtract(new Date(2016,3,3), -1.5, 'days').getDate(), 5, 'subtract -1.5 days is rounded to subtract -2 day');
    test.equal(subtract(new Date(2016,3,30), -1.5, 'days').getDate(), 2, 'subtract -1.5 days on last of month wraps around');
    test.equal(subtract(new Date(2016,3,3), 1.5, 'months').getMonth(), 1, 'subtract 1.5 months subtract 2 months');
    test.equal(subtract(new Date(2016,3,3), -1.5, 'months').getMonth(), 5, 'subtract -1.5 months subtract -2 month');
    test.equal(subtract(new Date(2016,11,31), -1.5, 'months').getMonth(),1, 'subtract -1.5 months at end of year wraps back');
    test.equal(short(add(new Date(2016, 0,1), 1.5, 'years')), '2017-7-1', 'add 1.5 years adds 1 year six months');
    test.equal(short(add(new Date(2016, 0,1), 1.6, 'years')), '2017-8-1', 'add 1.6 years becomes 1.6*12 = 19.2, round, 19 months');
    test.equal(short(add(new Date(2016,0,1), 1.1, 'quarters')), '2016-4-1', 'add 1.1 quarters 1.1*3=3.3, round, 3 months');
    test.done();
});

function short (date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
}
