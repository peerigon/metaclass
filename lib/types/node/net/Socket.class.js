"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents the node net socket
 *
 * @class Socket
 * @extends lib.Socket
 */
function Socket() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    Socket.prototype = new Socket();
    return new Socket();
};