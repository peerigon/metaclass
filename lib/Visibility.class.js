"use strict"; // run code in ES5 strict mode

/**
 * @class lib.Visibility
 *
 * Provides constants to describe the visibility of properties
 */
function Visibility() {
}


/**
 * @static
 * @type js.String
 */
Visibility.PUBLIC = "PUBLIC";

/**
 * @static
 * @type js.String
 */
Visibility.PROTECTED = "PROTECTED";

/**
 * @static
 * @type js.String
 */
Visibility.PRIVATE = "PRIVATE";


module.exports = Object.freeze(Visibility);