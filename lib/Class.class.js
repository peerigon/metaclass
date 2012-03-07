"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is");

/**
 * Represents a class with methods and properties
 *
 * @constructor
 * @param {!PropertyCollection} propertyCollection
 */
module.exports = function Class(propertyCollection) {
    var Properties = {},
        Public = this;

    /**
     * @private
     * @type {String}
     */
    Properties.__classId = null;

    /**
     * @private
     * @type {String}
     */
    Properties.__path = null;

    /**
     * @private
     * @type {String}
     */
    Properties.__className = null;

    /**
     * @private
     * @type {Class}
     */
    Properties.__superClass = null;

    /**
     * @private
     * @type {!PropertyCollection}
     */
    Properties.__properties = undefined;

    function construct() {
        if (is(propertyCollection).notExistent()) {
            throw new TypeError("The Class requires a PropertyCollection");
        }
        Properties.__properties = propertyCollection;
    }

    /**
     * Returns true if the given property is overridden by a property from the array
     *
     * @private
     * @param {Array} props an array of AbstractProperties
     * @param {AbstractProperty} prop the property to test
     * @return {Boolean}
     */
    Properties.__isOverridden = function (props, prop) {
        function isProperty(currentProp) {
            return prop.getName() === currentProp.getName() &&
                prop.getStatic() === currentProp.getStatic() &&
                prop.isAbstract() === currentProp.isAbstract();
        }

        return props.some(isProperty);
    }.bind(Properties);

    /**
     * Path in the file system, where the source file is stored
     *
     * @public
     * @param {String} fsPath
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setPath = Properties.setPath = function (fsPath) {
        if (fsPath !== null && is(fsPath).instanceOf(String)) {
            throw new TypeError("You have to pass null or a string");
        }
        this.__path = fsPath;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getPath = Properties.getPath = function () {
        return this.__path;
    }.bind(Properties);

    /**
     * @public
     * @param {String} classId
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setClassId = Properties.setClassId = function (classId) {
        var classIdSplitted,
            className = null;

        if (classId !== null && is(classId).notInstanceOf(String)) {
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
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getClassId = Properties.getClassId = function () {
        return this.__classId;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getClassName = Properties.getClassName = function () {
        return this.__className;
    }.bind(Properties);

    /**
     * @public
     * @param {AbstractProperty} property
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setProperty = Properties.setProperty = function (property) {
        this.__properties.setProperty(property);
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @param {String} propName
     * @param {Boolean=false} isStatic
     * @throws {TypeError}
     * @return {Class}
     */
    Public.getProperty = Properties.getProperty = function (propName, isStatic) {
        return this.__properties.getProperty(propName, isStatic);
    }.bind(Properties);

    /**
     * @public
     * @param {Class} superClass
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setSuperClass = Properties.setSuperClass = function (superClass) {
        if (superClass !== null && is(superClass).notInstanceOf(Class)) {
            throw new TypeError("The superClass must be null or an instance of Class");
        }
        this.__superClass = superClass;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Class}
     */
    Public.getSuperClass = Properties.getSuperClass = function () {
        return this.__superClass;
    }.bind(Properties);

    /**
     * Removes a property from the class. You may pass the name of the property or the property
     * itself to identify it.
     *
     * Please note: If you just pass the name, every static and non-static method
     * matching that name will be removed.
     *
     * @public
     * @param {String|AbstractMethod} property the property or the property's name
     * @throws {TypeError}
     */
    Public.removeProperty = Properties.removeProperty = function (property) {
        this.__properties.removeProperty(property);
    }.bind(Properties);

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
     * @param {Object={}} filter
     * @throws {TypeError}
     * @return {Array} array with all queried properties
     */
    Public.getProperties = Properties.getProperties = function (filter) {
        var result,
            tempFilterThis;

        if (filter === undefined) {
            filter = {};
        }
        if (is(filter).notInstanceOf(Object)) {
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
    }.bind(Properties);

    /**
     * @public
     * @return {Array} a PropertyCollection with all inherited properties, that are overridden by this class
     */
    Public.getOverriddenProperties = Properties.getOverriddenProperties = function () {
        var superProps,
            superProp,
            thisProps,
            filterObj = {
                Private: false,  // private properties can not be overridden
                Inherited: false // since we're collecting manually, we don't want the inherited
            },
            i,
            result = [];

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
                superProps[i] = props[i];
            }
        }

        if (this.__superClass !== null) {
            thisProps = this.getProperties(filterObj);
            superProps = [];
            collectSuperProperties(this.__superClass);
            for (i = 0; i < superProps.length; i++) {
                superProp = superProps[i];
                if (this.__isOverridden(thisProps, superProp)) {    // IF TRUE: The superProp is overridden
                    result[i] = superProp;
                }
            }
        }

        return result;
    }.bind(Properties);

    /**
     * @public
     * @return {Boolean}
     */
    Public.isAbstract = Properties.isAbstract = function () {
        var properties = this.getProperties({
            Inherited: false,
            Implemented: false
        });

        return properties.length > 0;
    }.bind(Properties);

    inherit(Properties.Super, Public);
    construct();
};