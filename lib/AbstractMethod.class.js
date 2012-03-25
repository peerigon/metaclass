"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is"),
    AbstractProperty = require("./AbstractProperty.class");

/**
 * Represents a class method
 *
 * @constructor
 * @extends AbstractProperty
 */
function AbstractMethod() {
    var Properties = {
            Super: new AbstractProperty()
        },
        Public = this;

    /**
     * @private
     * @type {Array}
     */
    Properties.__requiredParams = [];

    /**
     * @private
     * @type {Array}
     */
    Properties.__optionalParams = [];

    /**
     * Sets a required parameter for a method. The paramType must either be a classId
     * that identifies the type or undefined for mixed types.
     *
     * If you pass null as paramType, the param will be deleted from list.
     *
     * @public
     * @param {!Number} index whether it's the first, second, ... param. Starting with 0.
     * @param {String|Undefined} paramType
     * @throws {TypeError}
     * @throws {RangeError}
     * @return {AbstractMethod}
     */
    Public.setRequiredParam = Properties.setRequiredParam = function (index, paramType) {
        var paramTypeIs = is(paramType);

        function paramsToKeep(paramType, currentIndex) {
            return currentIndex !== index;
        }

        if (is(index).notInstanceOf(Number)) {
            throw new TypeError("The index must be a number");
        }
        if (index < 0 || index > this.__requiredParams.length) {
            throw new RangeError("The index must be greater than 0 and not greater than the number of required params");
        }
        if (paramTypeIs.existent() && paramTypeIs.notInstanceOf(String)) {
            throw new TypeError("The paramType must be a string, null or undefined");
        }

        if (paramType === null) {
            this.__requiredParams = this.__requiredParams.filter(paramsToKeep);
        } else {
            this.__requiredParams[index] = paramType;
        }

        return Public;
    }.bind(Properties);

    /**
     * Returns an array with all required paramTypes. For instance:
     * ["String", "lib.SomeClass", "Boolean"]
     *
     * @public
     * @return {Array}
     */
    Public.getRequiredParams = Properties.getRequiredParams = function () {
        return this.__requiredParams.concat();
    }.bind(Properties);

    /**
     * Sets an optional parameter for a method. The paramType must either be a classId
     * that identifies the type or undefined for mixed types.
     *
     * If you pass null as paramType, the param will be deleted from list.
     *
     * @public
     * @param {Number} index whether it's the first, second, ... optional param. Starting with 0.
     * @param {String|Undefined} paramType
     * @throws {TypeError}
     * @throws {RangeError}
     * @return {AbstractMethod}
     */
    Public.setOptionalParam = Properties.setOptionalParam = function (index, paramType) {
        var paramTypeIs = is(paramType);

        function paramsToKeep(paramType, currentIndex) {
            return currentIndex !== index;
        }

        if (is(index).notInstanceOf(Number)) {
            throw new TypeError("The index must be a number");
        }
        if (index < 0 || index > this.__optionalParams.length) {
            throw new RangeError("The index must be greater than 0 and not greater than the number of optional params");
        }
        if (paramTypeIs.existent() && paramTypeIs.notInstanceOf(String)) {
            throw new TypeError("The paramType must be null, a string or undefined");
        }

        if (paramType === null) {
            this.__optionalParams = this.__optionalParams.filter(paramsToKeep);
        } else {
            this.__optionalParams[index] = paramType;
        }

        return Public;
    }.bind(Properties);

    /**
     * Returns an array with all optional paramTypes. For instance:
     * ["js.String", "lib.SomeClass", "js.Boolean"]
     *
     * @public
     * @return {Array}
     */
    Public.getOptionalParams = Properties.getOptionalParams = function () {
        return this.__optionalParams.concat();
    }.bind(Properties);

    /**
     * Returns the number of required params
     *
     * @public
     * @return {Number}
     */
    Public.getNumOfRequiredParams = Properties.getNumOfRequiredParams = function () {
        return this.__requiredParams.length;
    }.bind(Properties);

    /**
     * Returns the number of all params
     *
     * @public
     * @return {Number}
     */
    Public.getNumOfParams = Properties.getNumOfParams = function () {
        return this.__requiredParams.length + this.__optionalParams.length;
    }.bind(Properties);

    /**
     * @public
     * @return {Boolean}
     */
    Public.isAbstract = Properties.isAbstract = function () {
        return true;
    }.bind(Properties);

    inherit(Properties.Super, Public);
}

/**
 * @public
 * @const
 * @static
 * @type {Function}
 */
AbstractMethod.Extends = AbstractProperty;

module.exports = AbstractMethod;
