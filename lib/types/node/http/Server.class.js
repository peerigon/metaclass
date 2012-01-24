"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents the node http server
 *
 * @class Server
 * @extends lib.Class
 */
function Server() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    Server.prototype = new Class();
    return new Server();
};