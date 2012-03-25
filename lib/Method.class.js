"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is"),
    AbstractMethod = require("./AbstractMethod.class");

/**
 * Represents a class method
 *
 * @constructor
 * @extends AbstractMethod
 */
function Method() {
    var Properties = {
            Super: new AbstractMethod()
        },
        Public = this;

    /**
     * @private
     * @type {String}
     */
    Properties.__code = null;

    /**
     * Sets an implementation code for this method
     *
     * @public
     * @param {String} code
     * @throws {TypeError}
     * @return {Method}
     */
    Public.setCode = Properties.setCode = function (code) {
        if (code !== null && is(code).notInstanceOf(String)) {
            throw new TypeError("The code must be null or a string");
        }

        this.__code = code;

        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getCode = Properties.getCode = function () {
        return this.__code;
    }.bind(Properties);

    /**
     * @public
     * @return {Boolean}
     */
    Public.isAbstract = Properties.isAbstract = function () {
        return false;
    }.bind(Properties);

    inherit(Properties.Super, Public);
}

/**
 * @public
 * @const
 * @static
 * @type {Function}
 */
Method.Extends = AbstractMethod;

module.exports = Method;