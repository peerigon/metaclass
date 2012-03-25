"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is"),
    AbstractProperty = require("./AbstractProperty.class");

/**
 * Represents an implemented property
 *
 * @constructor
 * @extends AbstractProperty
 */
function Property() {
    var Properties = {
            Super: new AbstractProperty()
        },
        Public = this;

    /**
     * @public
     * @type {Function}
     */
    this.constructor.Extends = AbstractProperty;

    /**
     * @private
     * @type {String}
     */
    Properties.__initialValue = null;

    /**
     * @public
     * @param {String} initialValue as eval-ready JavaScript-Code, e.g. "[1, 2, 3]"
     * @throws {TypeError}
     * @return {Property}
     */
    Public.setInitialValue = Properties.setInitialValue = function (initialValue) {
        if (initialValue !== null && is(initialValue).notInstanceOf(String)) {
            throw new TypeError("The initial value must be a string or null");
        }
        this.__initialValue = initialValue;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getInitialValue = Properties.getInitialValue = function () {
        return this.__initialValue;
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

module.exports = Property;