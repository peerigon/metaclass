"use strict"; // run code in ES5 strict mode

/**
 * Returns an object, that provides some methods to test the type of the subject.
 *
 * Provides testing methods:
 * - instanceOf    Usage: is(myObj).instanceOf(MyClass)
 *
 * @public
 * @param {js.Object} subject the subject to test
 * @return {js.Object}
 */
module.exports = function (subject) {
    return {
        instanceOf: function (Class) {
            if (typeof subject === "undefined" || subject === null || subject.instanceOf === undefined) {
                return false;
            } else {
                return subject.instanceOf(Class);
            }
        }
    };
};