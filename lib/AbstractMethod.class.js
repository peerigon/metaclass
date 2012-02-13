"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct"),
    AbstractProperty = require("./AbstractProperty.class");

/**
 * Represents a class method
 *
 * @class lib.AbstractMethod
 * @extends lib.AbstractProperty
 */
module.exports = function AbstractMethod() {
    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;
    this.Super = new AbstractProperty();

    /**
     * @private
     * @type {js.Array}
     */
    this.__requiredParams = [];

    /**
     * @private
     * @type {js.Array}
     */
    this.__optionalParams = [];

    /**
     * Sets a required parameter for a method. The paramType must either be a classId
     * that identifies the type or undefined for mixed types.
     *
     * If you pass null as paramType, the param will be deleted from list.
     *
     * @public
     * @param {js.Number} index whether it's the first, second, ... param. Starting with 0.
     * @param {String|Undefined} paramType
     * @throws {js.TypeError}
     * @throws {js.RangeError}
     * @return {lib.Method}
     */
    Public.setRequiredParam = this.setRequiredParam = function (index, paramType) {
        function paramsToKeep(paramType, currentIndex) {
            return currentIndex !== index;
        }

        if (typeof index !== "number") {
            throw new TypeError("The index must be a number");
        }
        if (index < 0 || index > this.__requiredParams.length) {
            throw new RangeError("The index must be greater than 0 and not greater than the number of required params");
        }
        if (typeof paramType !== "string" && typeof paramType !== "undefined" && paramType !== null) {
            throw new TypeError("The paramType must be a string or undefined");
        }

        if (paramType === null) {
            this.__requiredParams = this.__requiredParams.filter(paramsToKeep);
        } else {
            this.__requiredParams[index] = paramType;
        }

        return Public;
    }.bind(this);

    /**
     * Returns an array with all required paramTypes. For instance:
     * ["js.String", "lib.SomeClass", "js.Boolean"]
     *
     * @public
     * @return {js.Array}
     */
    Public.getRequiredParams = this.getRequiredParams = function () {
        return this.__requiredParams.concat();
    }.bind(this);

    /**
     * Sets an optional parameter for a method. The paramType must either be a classId
     * that identifies the type or undefined for mixed types.
     *
     * If you pass null as paramType, the param will be deleted from list.
     *
     * @public
     * @param {js.Number} index whether it's the first, second, ... optional param. Starting with 0.
     * @param {js.String|js.Undefined} paramType
     * @throws {js.TypeError}
     * @throws {js.RangeError}
     * @return {lib.Method}
     */
    Public.setOptionalParam = this.setOptionalParam = function (index, paramType) {
        function paramsToKeep(paramType, currentIndex) {
            return currentIndex !== index;
        }

        if (typeof index !== "number") {
            throw new TypeError("The index must be a number");
        }
        if (index < 0 || index > this.__optionalParams.length) {
            throw new RangeError("The index must be greater than 0 and not greater than the number of optional params");
        }
        if (typeof paramType !== "string" && typeof paramType !== "undefined" && paramType !== null) {
            throw new TypeError("The paramType must be a string or undefined");
        }

        if (paramType === null) {
            this.__optionalParams = this.__optionalParams.filter(paramsToKeep);
        } else {
            this.__optionalParams[index] = paramType;
        }

        return Public;
    }.bind(this);

    /**
     * Returns an array with all optional paramTypes. For instance:
     * ["js.String", "lib.SomeClass", "js.Boolean"]
     *
     * @public
     * @param {paramType} paramName paramDescr
     * @return {js.Array}
     */
    Public.getOptionalParams = this.getOptionalParams = function () {
        return this.__optionalParams.concat();
    }.bind(this);

    /**
     * Returns the number of required params
     *
     * @public
     * @return {js.Number}
     */
    Public.getNumOfRequiredParams = this.getNumOfRequiredParams = function () {
        return this.__requiredParams.length;
    }.bind(this);

    /**
     * Returns the number of all params
     *
     * @public
     * @return {js.Number}
     */
    Public.getNumOfParams = this.getNumOfParams = function () {
        return this.__requiredParams.length + this.__optionalParams.length;
    }.bind(this);

    /**
     * @public
     * @return {js.Boolean}
     */
    Public.isAbstract = this.isAbstract = function () {
        return true;
    }.bind(this);

    return construct.call(this);
};