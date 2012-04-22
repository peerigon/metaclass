"use strict"; // run code in ES5 strict mode

var is = require("./is"),
    AbstractProperty = require("../AbstractProperty.class.js"),
    AbstractMethod = require("../AbstractMethod.class.js");

/**
 * Accepts only the specified types of Properties.
 *
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
 * Properties that do not contain any information about one of these filter
 * criteria are filtered automatically.
 *
 * @constructor
 * @param {!Object} filterDescriptor
 * @throws {TypeError} when the filterDescriptor is missing
 */
function PropertyFilter(filterDescriptor) {
    var Properties = {},
        Public = this;

    /**
     * Constructor
     * @throws {TypeError}
     */
    function construct() {
        filterDescriptor = Properties.prepareFilterDescriptor(filterDescriptor);
    }

    /**
     * Adds all default values to the filter object
     *
     * @private
     * @param {Object} filterDescriptor
     * @throws {TypeError}
     * @return {Object} filterDescriptor
     */
    Properties.prepareFilterDescriptor = function (filterDescriptor) {
        if (filterDescriptor.constructor !== Object) {
            throw new TypeError("You must specify a filter descriptor object that describes, which properties should pass the filter");
        }

        filterDescriptor.Private = filterDescriptor.Private === undefined ?
            true : filterDescriptor.Private;
        filterDescriptor.Protected = filterDescriptor.Protected === undefined ?
            true : filterDescriptor.Protected;
        filterDescriptor.Public = filterDescriptor.Public === undefined ?
            true : filterDescriptor.Public;
        filterDescriptor.Static = filterDescriptor.Static === undefined ?
            true : filterDescriptor.Static;
        filterDescriptor.Instance = filterDescriptor.Instance === undefined ?
            true : filterDescriptor.Instance;
        filterDescriptor.Abstract = filterDescriptor.Abstract === undefined ?
            true : filterDescriptor.Abstract;
        filterDescriptor.Implemented = filterDescriptor.Implemented === undefined ?
            true : filterDescriptor.Implemented;
        filterDescriptor.Method = filterDescriptor.Method === undefined ?
            true : filterDescriptor.Method;
        filterDescriptor.Attribute = filterDescriptor.Attribute === undefined ?
            true : filterDescriptor.Attribute;

        return filterDescriptor;
    }.bind(Properties);

    /**
     * Applies the filter on one property and returns the boolean result
     *
     * @public
     * @param {!AbstractProperty} property
     * @throws {TypeError}
     * @return {Boolean}
     */
    Public.test = Properties.test = function (property) {
        var visibility,
            isAbstract,
            isMethod,
            isStatic,
            propertyIs = is(property);

        if (propertyIs.notInstanceOf(AbstractProperty)) {
            throw new TypeError("The property must be an instance of AbstractProperty");
        }

        visibility = property.getVisibility();
        isAbstract = property.isAbstract();
        isMethod = propertyIs.instanceOf(AbstractMethod);
        isStatic = property.getStatic();

        if (visibility === null) {
            return false; // if there are no information about the visibility, filter it!
        }

        // Preparing the visibility-string: Capitalize the first letter
        visibility = visibility.charAt(0) + visibility.substr(1).toLowerCase();

        if (filterDescriptor[visibility] === false) {
            return false;
        }

        if (isStatic) {
            if (filterDescriptor.Static === false) {
                return false;
            }
        } else {
            if (filterDescriptor.Instance === false) {
                return false;
            }
        }

        if (isAbstract) {
            if (filterDescriptor.Abstract === false) {
                return false;
            }
        } else {
            if (filterDescriptor.Implemented === false) {
                return false;
            }
        }

        if (isMethod) {
            if (filterDescriptor.Method === false) {
                return false;
            }
        } else {
            if (filterDescriptor.Attribute === false) {
                return false;
            }
        }

        return true;
    }.bind(Properties);

    /**
     * Applies the filter on the given selection of properties and returns only
     * those, which passes the test. The passed array will not be modified.
     *
     * @public
     * @param {!Array} properties array of properties
     * @throws {TypeError}
     * @return {Array} an array with all properties that passed the test
     */
    Public.applyOn = Properties.applyOn = function (properties) {
        if (is(properties).notInstanceOf(Array)) {
            throw new TypeError("properties must be an instance of Array");
        }
        return properties.filter(this.test);
    }.bind(Properties);

    construct();
}

module.exports = PropertyFilter;