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
     * @type {*}
     */
    Properties.__initialValue = null;

    /**
     * @public
     * @param {*} initialValue
     * @return {Property}
     */
    Public.setInitialValue = Properties.setInitialValue = function (initialValue) {
        this.__initialValue = initialValue;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {*}
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