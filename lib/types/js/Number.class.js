"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents a native number
 *
 * @class Number
 * @extends lib.Class
 */
function Number() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register the native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    Number.prototype = new Class();
    return new Number();
};