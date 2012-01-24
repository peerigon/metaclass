"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents the node file system read stream class
 *
 * @class ReadStream
 * @extends lib.Class
 */
function ReadStream() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    ReadStream.prototype = new Class();
    return new ReadStream();
};