"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents a native array
 *
 * @class Array
 * @extends lib.Class
 */
function Array() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register the native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    Array.prototype = new Class();
    return new Array();
};