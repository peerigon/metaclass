"use strict"; // run code in ES5 strict mode

var Property = require("./Property.class");

/**
 * Represents a class
 *
 * @class Class
 */
function Class() {
    var self = this;

    this.Public = {};
    
    /**
     * @private
     * @type {js.String}
     */
    this.__classId = null;

    /**
     * @private
     * @type {js.Obect}
     */
    this.__properties = {};

    /**
     * @private
     * @type {lib.Class}
     */
    this.__parentClass = null;

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
        filter.Inherited = filter.Inherited === undefined ? true : filter.Inherited;
        filter.This = filter.This === undefined ? true : filter.This;

        return filter;

    }.bind(this);

    /**
     * @private
     * @param {js.Object} filter
     * @param {lib.AbstractProperty} property
     * @return {js.Boolean}
     */
    this.__applyFilter = function (filter, property) {

        var visibility = property.getVisibility(),
            isAbstract = property instanceof Property === false,
            isStatic = property.isStatic();

        // Preparing the visibility-string: Capitalize the first letter
        visibility = visibility.charAt(0) + visibility.substr(1).toLowerCase();

        if (filter[visibility] === false) {
            return false;
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

        if (isStatic) {
            if (filter.Static === false) {
                return false;
            }
        } else {
            if (filter.Instance === false) {
                return false;
            }
        }

        return true;

    }.bind(this);

    /**
     * @public
     * @param {js.String} classId
     * @return {lib.Class}
     */
    this.setClassId = this.Public.setClassId = function (classId) {

        this.__classId = classId;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getClassId = this.Public.getClassId = function () {

        return this.__classId;

    }.bind(this);

    /**
     * @public
     * @param {lib.Class} parentClass
     * @return {lib.Class}
     */
    this.setParentClass = this.Public.setParentClass = function (parentClass) {

        if (parentClass instanceof Class === false) {
            throw new TypeError("parentClass must be an instance of Class");
        }
        this.__parentClass = parentClass;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.Class}
     */
    this.getParentClass = this.Public.getParentClass = function () {

        return this.__parentClass;

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
     *      Inherited: true, // will include all inherited properties
     *      This: true // equals all properties that are not inherited
     * }
     *
     * True means, that the object will pass the filter. If a key is missing,
     * the default value true is applied
     *
     * @public
     * @param {js.Object={}} filter
     * @return {js.Object} object with all queried properties and keys like property names
     */
    this.getProperties = this.Public.getProperties = function (filter) {

        var properties = this.__properties,
            key,
            prop,
            result;

        if (filter === undefined) {
            filter = {};
        }

        filter = this.__prepareFilterObj(filter);

        if (filter.Inherited === true && this.__parentClass !== null) { // IF TRUE: The class has a parent class and we want all inherited properties
            result = this.__parentClass.getProperties(filter);
        } else {
            result = {};
        }

        if (filter.This === true) {
            for (key in properties) {
                if (properties.hasOwnProperty(key)) {
                    prop = properties[key];
                    if (this.__applyFilter(filter, prop) === true) {
                        result[prop.getName()] = prop;
                    }
                }
            }
        }


        return result;

    }.bind(this);

    /**
     * @public
     * @param {lib.AbstractProperty} property
     * @return {lib.Class}
     */
    this.setProperty = this.Public.setProperty = function (property) {

        this.__properties[property.getName()] = property;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.AbstractProperty}
     */
    this.getProperty = this.Public.getProperty = function () {

        return this.__properties;

    }.bind(this);

    return this.Public;
}

module.exports = Class;