"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents the node net server
 *
 * @class Server
 * @extends lib.Class
 */
function Server(params) {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor(params) {
    Server.prototype = new Class();
    return new Server(params);
};