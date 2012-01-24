"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents the native RegExp object
 *
 * @class RegExp
 * @extends lib.Class
 */
function RegExp() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    RegExp.prototype = new Class();
    return new RegExp();
};