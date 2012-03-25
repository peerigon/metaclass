"use strict"; // run code in ES5 strict mode

/**
 * Adds all functions from the first object to the second object,
 * if they don't exist yet.
 *
 * IMPORTANT NOTE:
 * Make sure that all functions from the first object are enumerable.
 * So if you pass a native object like String as the first object, nothing will happen.
 *
 * @public
 * @param {!Object} from
 * @param {!Object} to
 */
module.exports = function inherit(from, to) {
    var key,
        prop;

    for (key in from) {
        if (from.hasOwnProperty(key)) {
            prop = from[key];
            if (typeof prop === "function" &&
                    key !== "constructor" &&
                    to[key] === undefined) {
                to[key] = prop.bind(from);
            }
        }
    }
};