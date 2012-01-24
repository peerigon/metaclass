"use strict"; // run code in ES5 strict mode

var Class = require("../../Class.class");

/**
 * Represents the node http serverresponse
 *
 * @class ServerResponse
 * @extends lib.Class
 */
function ServerResponse() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    //TODO: Register native functions as properties to the parent Class.

    return this.Public;
}

module.exports = function Constructor() {
    ServerResponse.prototype = new Class();
    return new ServerResponse();
};