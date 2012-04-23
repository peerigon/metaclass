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
     * @type {Function}
     */
    Properties.__function = null;

    /**
     * @public
     * @param {Function} function
     * @return {Method}
     */
    Public.setFunction = Properties.setFunction = function (function_) {
        if (function_ !== null && is(function_).notInstanceOf(Function)) {
            throw new TypeError("The function must be an instance of Function or null")
        }
        this.__function = function_;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Function}
     */
    Public.getFunction = Properties.getFunction = function () {
        return this.__function;
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