"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct"),
    Method = require("./Method.class"),
    Property = require("./Property.class"),
    AbstractMethod = require("./AbstractMethod.class"),
    AbstractProperty = require("./AbstractProperty.class");

/**
 * Stores a bunch of properties and provides some methods to select these
 *
 * @class PropertyCollection
 */
module.exports = function PropertyCollection() {

    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;

    /**
     * @private
     * @type {js.Object}
     */
    this.__instanceProps = {};

    /**
     * @private
     * @type {js.Object}
     */
    this.__staticProps = {};

    /**
     * Adds all default values for the filter object
     *
     * @private
     * @param {js.Object} filter
     * @return {js.Object}
     */
    this.__prepareFilterObj = function (filter) {
        filter.Private = filter.Private === undefined ? true : filter.Private;
        filter.Protected = filter.Protected === undefined ? true : filter.Protected;
        filter.Public = filter.Public === undefined ? true : filter.Public;
        filter.Static = filter.Static === undefined ? true : filter.Static;
        filter.Instance = filter.Instance === undefined ? true : filter.Instance;
        filter.Abstract = filter.Abstract === undefined ? true : filter.Abstract;
        filter.Implemented = filter.Implemented === undefined ? true : filter.Implemented;
        filter.Method = filter.Method === undefined ? true : filter.Method;
        filter.Attribute = filter.Attribute === undefined ? true : filter.Attribute;

        return filter;
    }.bind(this);

    /**
     * @private
     * @param {lib.AbstractProperty} member
     * @return {js.Boolean}
     */
    this.__isMethod = function (property) {
        return property.instanceOf(AbstractMethod);
    }.bind(this);

    /**
     * @private
     * @param {js.Object} filter
     * @param {lib.AbstractProperty} property
     * @return {js.Boolean}
     */
    this.__applyFilter = function (filter, property) {
        var visibility = property.getVisibility(),
            isAbstract = property.isAbstract(),
            isMethod = this.__isMethod(property),
            isStatic = property.getStatic();

        // Preparing the visibility-string: Capitalize the first letter
        visibility = visibility.charAt(0) + visibility.substr(1).toLowerCase();

        if (filter[visibility] === false) {
            return false;
        }

        if (isStatic) {
            if (filter.Static === false) {
                return false;
            }
        } else {
            if (filter.Instance === false) {
                return false;
            }
        }

        if (isAbstract) {
            if (filter.Abstract === false) {
                return false;
            }
        } else {
            if (filter.Implemented === false) {
                return false;
            }
        }

        if (isMethod) {
            if (filter.Method === false) {
                return false;
            }
        } else {
            if (filter.Attribute === false) {
                return false;
            }
        }

        return true;
    }.bind(this);

    /**
     * @public
     * @param {lib.AbstractProperty} property
     * @throws {js.TypeError}
     * @throws {js.Error}
     * @return {lib.PropertyCollection}
     */
    Public.setProperty = this.setProperty = function (property) {
        var propName;

        if (property.instanceOf === undefined || property.instanceOf(AbstractProperty) === false) {
            throw new TypeError("You have to set an instance of AbstractProperty");
        }
        propName = property.getName();
        if (propName === null) {
            throw new Error("The property needs a name before you add it to the collection");
        }
        if (property.getStatic() === true) {
            this.__staticProps[propName] = property;
        } else {
            this.__instanceProps[propName] = property;
        }

        return Public;
    }.bind(this);

    /**
     * @public
     * @param {js.String} propName
     * @param {js.Boolean=false} isStatic
     * @throws {js.TypeError}
     * @return {lib.AbstractMethod}
     */
    Public.getProperty = this.getProperty = function (propName, isStatic) {
        if (typeof propName !== "string") {
            throw new TypeError("The propName must be a string");
        }
        if (isStatic === undefined) {
            isStatic = false;
        }
        if (typeof isStatic !== "boolean") {
            throw new TypeError("The isStatic param must be boolean or undefined");
        }

        if (isStatic) {
            return this.__staticProps[propName] || null;
        } else {
            return this.__instanceProps[propName] || null;
        }
    }.bind(this);

    /**
     * Removes a property from the collection. You may pass the name of the property or the property
     * itself to identify it.
     *
     * Please note: If you just pass the name, every static and non-static method
     * matching that name will be removed.
     *
     * @public
     * @param {js.String|lib.AbstractMethod} property the property or the property's name
     * @throws {js.TypeError}
     */
    Public.removeProperty = this.removeProperty = function (property) {
        var propertyIsAString = typeof property === "string";

        function isStringOrAnInstanceOfAbstractProperty(property) {
            return propertyIsAString === true ||
                (property.instanceOf !== undefined && property.instanceOf(AbstractProperty) === true);
        }

        if (isStringOrAnInstanceOfAbstractProperty(property) === false) {
            throw new TypeError("The method must be a string or an instance of AbstractMethod");
        }

        if (propertyIsAString) {
            delete this.__instanceProps[property];
            delete this.__staticProps[property];
        } else {
            if (property.getStatic() === true) {
                delete this.__staticProps[property.getName()];
            } else {
                delete this.__instanceProps[property.getName()];
            }
        }
    }.bind(this);

    /**
     * The filter object is structured by default like this:
     *
     * {
     *      Private: true,
     *      Protected: true,
     *      Public: true,
     *      Static: true,
     *      Instance: true, // equals all properties that are not static
     *      Abstract: true,
     *      Implemented: true // equals all properties that are not abstract
     *      Attribute: true, // equals all properties that are no method
     *      Method: true
     * }
     *
     * True means, that the property will pass the filter. If a key is missing,
     * the default value true is applied
     *
     * @public
     * @param {js.Object={}} filter
     * @throws {js.TypeError}
     * @return {js.Array} array with all queried properties
     */
    Public.getProperties = this.getProperties = function (filter) {
        var self = this,
            method,
            result = [];

        function iterateProperties(property) {
            var key;

            for (key in property) {
                if (property.hasOwnProperty(key)) {
                    method = property[key];
                    if (filter === undefined || self.__applyFilter(filter, method) === true) {
                        result.push(method);
                    }
                }
            }
        }

        if (filter !== undefined && (typeof filter !== "object" || Array.isArray(filter) === true)) {
            throw new TypeError("You have to pass a filter object to getProperties()");
        }

        if (filter !== undefined) {
            filter = this.__prepareFilterObj(filter);
        }

        if (filter === undefined || filter.Instance === true) {
            iterateProperties(this.__instanceProps);
        }
        if (filter === undefined || filter.Static === true) {
            iterateProperties(this.__staticProps);
        }

        return result;
    }.bind(this);

    return construct.call(this);
};