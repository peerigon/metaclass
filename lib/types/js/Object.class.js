"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents a native object
 *
 * @class Object
 * @extends lib.Class
 */
function Object() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register the native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    Object.prototype = new Class();
    return new Object();
};