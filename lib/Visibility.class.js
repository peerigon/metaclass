"use strict"; // run code in ES5 strict mode

/**
 * @class Visibility
 *
 * Provides constants to describe the visibility of properties
 */
function Visibility() {
}


/**
 * @static
 * @type javascript.String
 */
Visibility.PUBLIC = "PUBLIC";

/**
 * @static
 * @type javascript.String
 */
Visibility.PROTECTED = "PROTECTED";

/**
 * @static
 * @type javascript.String
 */
Visibility.PRIVATE = "PRIVATE";


module.exports = Object.freeze(Visibility);