"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents the node file system stats class
 *
 * @class Stats
 * @extends lib.Class
 */
function Stats() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    Stats.prototype = new Class();
    return new Stats();
};