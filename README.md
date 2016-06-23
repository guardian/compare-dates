Simple modular utilities to compare JavaScript dates

## Reason

I've taken most of the code from [moment](https://github.com/moment/moment), massive thanks to Tim Wood, Iskren Chernev and Moment.js contributors.

Importing `moment` with ES6 is currently [broken](https://github.com/moment/moment/issues/3104). It kinda works if you want to pull in the entire [library](https://github.com/moment/moment/issues/2373). If however you want to benefit from rollup treeshaking you're out of luck.

With this project I've extracted some of the methods for comparing native dates, with some changes.

Instead of having a base object, all methods are standalone and take JavaScript Dates as parameters.

```js
// moment.js
moment().isBefore(moment().add(1, 'day'));
// compare-dates
isBefore(new Date(), add(new Date(), 1, 'day'));
```

Moment treats [invalid dates](https://github.com/moment/moment/pull/2624) a `NaN`, so methods like `isBefore` return a Boolean. I've decided to throw an exception when invalid dates are used.

All methods are immutable

```js
const date = new Date(2016, 6, 1); // July 1st 2016
const later = add(date, 1, 'day');
  // later: July 2nd 2016
  // date: July 1st 2016

// moment.js
const date = moment(new Date(2016, 6, 1)); // July 1st 2016
const later = date.add(1, 'day'); // Both date and later are July 2nd 2016
```

## Methods

* `min(...dates)`, `max(...dates)` - Min or max date, throws on invalid dates
* `isAfter(first, second, unit)` - Check if a date is after another date
* `isBefore(first, second, unit)` - Check if a date is before another date
* `isBetween(first, start, end, unit, inclusion)` - Check if a date is between a range
* `isSame(first, second, unit)` - Check if a date is the same as another date
* `isSameOrAfter(first, second, unit)` - Check if a date is after or same as another date
* `isSameOrBefore(first, second, unit)` - Check if a date is before or same as another date
* `add(date, value, unit)` - Add a value to a date, returns a new date
* `subtract(date, value, unit)` - Subtract a value to a date, returns a new date
* `startOf(date, unit)` - Return a new date set to the start of a unit of time
* `endOf(date, unit)` - Return a new date set to the start of a unit of time

Check the documentation of [moment.js](http://momentjs.com/docs/) for details
