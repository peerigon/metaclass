"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct"),
    is = require("./helpers/is"),
    PropertyCollection = require("./PropertyCollection.class");

/**
 * Represents a class with methods and properties
 *
 * @class lib.Class
 */
module.exports = function Class() {
    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;

    /**
     * @private
     * @type {js.String}
     */
    this.__classId = null;

    /**
     * @private
     * @type {js.String}
     */
    this.__fsPath = null;

    /**
     * Path in the file system, where the source file is stored
     *
     * @public
     * @param {js.String} fsPath
     * @throws {js.TypeError}
     * @return {lib.Class}
     */
    Public.setFsPath = this.setFsPath = function (fsPath) {
        if (fsPath !== null && typeof fsPath !== "string") {
            throw new TypeError("You have to pass null or a string");
        }
        this.__fsPath = fsPath;
        return Public;
    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    Public.getFsPath = this.getFsPath = function () {
        return this.__fsPath;
    }.bind(this);

    /**
     * @private
     * @type {js.String}
     */
    this.__className = null;

    /**
     * @private
     * @type {lib.Class}
     */
    this.__superClass = null;

    /**
     * @private
     * @type {lib.PropertyCollection}
     */
    this.__properties = new PropertyCollection();

    /**
     * Returns true if the given property is overridden by a property from the array
     *
     * @private
     * @param {js.Array} props an array of AbstractProperties
     * @param {lib.AbstractProperty} prop the property to test
     * @return {js.Boolean}
     */
    this.__isOverridden = function (props, prop) {
        function isProperty(currentProp) {
            return prop.getName() === currentProp.getName() &&
                prop.getStatic() === currentProp.getStatic() &&
                prop.isAbstract() === currentProp.isAbstract();
        }

        return props.some(isProperty);
    }.bind(this);

    /**
     * @public
     * @param {js.String} classId
     * @throws {js.TypeError}
     * @return {lib.Class}
     */
    Public.setClassId = this.setClassId = function (classId) {
        var classIdSplitted,
            className = null;

        if (typeof classId !== "string" &&
                classId instanceof String === false &&
                classId !== null) {
            throw new TypeError("The class id must be null or a string");
        }
        if (classId !== null) {
            classIdSplitted = classId.split(".");
            if (classIdSplitted.length === 0) {
                className = classId;
            } else {
                className = classIdSplitted[classIdSplitted.length - 1];
            }
        }
        this.__className = className;
        this.__classId = classId;

        return Public;
    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    Public.getClassId = this.getClassId = function () {
        return this.__classId;
    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    Public.getClassName = this.getClassName = function () {
        return this.__className;
    }.bind(this);

    /**
     * @public
     * @param {lib.AbstractProperty} property
     * @throws {js.TypeError}
     * @return {lib.Class}
     */
    Public.setProperty = this.setProperty = function (property) {
        this.__properties.setProperty(property);
        return Public;
    }.bind(this);

    /**
     * @public
     * @param {js.String} propName
     * @param {js.Boolean=false} isStatic
     * @throws {js.TypeError}
     * @return {lib.Class}
     */
    Public.getProperty = this.getProperty = function (propName, isStatic) {
        return this.__properties.getProperty(propName, isStatic);
    }.bind(this);

    /**
     * @public
     * @param {lib.Class} superClass
     * @throws {js.TypeError}
     * @return {lib.Class}
     */
    Public.setSuperClass = this.setSuperClass = function (superClass) {
        if (superClass !== null && is(superClass).instanceOf(Class) === false) {
            throw new TypeError("The superClass must be null or an instance of Class");
        }
        this.__superClass = superClass;
        return Public;
    }.bind(this);

    /**
     * @public
     * @return {lib.Class}
     */
    Public.getSuperClass = this.getSuperClass = function () {
        return this.__superClass;
    }.bind(this);

    /**
     * Removes a property from the class. You may pass the name of the property or the property
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
        this.__properties.removeProperty(property);
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
     *      Method: true,
     *      Inherited: true,
     *      This: true // equals all properties, that are no inherited
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
        var result,
            tempFilterThis;

        if (filter === undefined) {
            filter = {};
        }
        if (typeof filter !== "object" || Array.isArray(filter) === true) {
            throw new TypeError("You have to pass a filter object to getProperties()");
        }

        // Setting default values
        filter.Inherited = filter.Inherited === undefined ? true : filter.Inherited;
        filter.This = filter.This === undefined ? true : filter.This;

        if (filter.Inherited === true && this.__superClass !== null) {
            tempFilterThis = filter.This;
            filter.This = true; // we have to overwrite the filter.This value now to get results
            result = this.__superClass.getProperties(filter);
            filter.This = tempFilterThis;
        } else {
            result = [];
        }
        if (filter.This === true) {
            result = result.concat(this.__properties.getProperties(filter));
        }

        return result;
    }.bind(this);

    /**
     * @public
     * @return {lib.PropertyCollection} a PropertyCollection with all inherited properties, that are overridden by this class
     */
    Public.getOverriddenProperties = this.getOverriddenProperties = function () {
        var superProps,
            superProp,
            thisProps,
            filterObj = {
                Private: false,  // private properties can not be overridden
                Inherited: false // since we're collecting manually, we don't want the inherited
            },
            i,
            result = new PropertyCollection();

        function collectSuperProperties(currentClass) {
            var i,
                superClass = currentClass.getSuperClass(),
                props = currentClass.getProperties(filterObj);

            // First we do the recursive call for the super class.
            // After that we add the property to superProps.
            // This way, superProps contains only properties, that are NOT overridden.
            if (superClass !== null) {
                collectSuperProperties(superClass); // recursive call
            }
            for (i = 0; i < props.length; i++) {
                superProps.setProperty(props[i]);
            }
        }

        if (this.__superClass !== null) {
            thisProps = this.getProperties(filterObj);
            superProps = new PropertyCollection();
            collectSuperProperties(this.__superClass);
            superProps = superProps.getProperties();    // from now on we're working with the array
            for (i = 0; i < superProps.length; i++) {
                superProp = superProps[i];
                if (this.__isOverridden(thisProps, superProp)) {    // IF TRUE: The superProp is overridden
                    result.setProperty(superProp);
                }
            }
        }

        return result;
    }.bind(this);

    /**
     * @public
     * @return {js.Boolean}
     */
    Public.isAbstract = this.isAbstract = function () {
        var properties = this.getProperties({
            Inherited: false,
            Implemented: false
        });

        return properties.length > 0;
    }.bind(this);

    return construct.call(this);
};