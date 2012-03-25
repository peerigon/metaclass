"use strict"; // run code in ES5 strict mode

/**
 * @namespace Visibility
 *
 * Provides constants to describe the visibility of properties
 */
var Visibility = {
    /**
     * @const
     * @type {String}
     */
    PUBLIC: "PUBLIC",
    /**
     * @const
     * @type {String}
     */
    PROTECTED: "PROTECTED",
    /**
     * @const
     * @type {String}
     */
    PRIVATE: "PRIVATE"
};

module.exports = Object.freeze(Visibility);