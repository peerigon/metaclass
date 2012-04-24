"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is");

/**
 * Represents an abstract class property.
 *
 * @constructor
 */
function AbstractProperty(Comment, Visibility) {
    var Properties = {},
        Public = this;

    Comment = Comment || require("./Comment.class.js");
    Visibility = Visibility || require("./Visibility.class.js");

    /**
     * @private
     * @type {String=null}
     */
    Properties.__name = null;

    /**
     * @private
     * @type {String=null}
     */
    Properties.__type = null;

    /**
     * @private
     * @type {String=null}
     */
    Properties.__visibility = null;

    /**
     * @private
     * @type {Comment=null}
     */
    Properties.__comment = null;

    /**
     * @private
     * @type {Boolean=false}
     */
    Properties.__static = false;

    /**
     * Returns true if the given value is one of the Visibility class' constants
     *
     * @private
     * @param {String} visibilityType
     * @return {Boolean}
     */
    Properties.__isAVisibilityType = function (visibilityType) {
        return visibilityType === Visibility.PUBLIC ||
            visibilityType === Visibility.PROTECTED ||
            visibilityType === Visibility.PRIVATE;
    }.bind(Properties);

    /**
     * @public
     * @param {String} name
     * @throws {TypeError}
     * @return {AbstractProperty}
     */
    Public.setName = Properties.setName = function (name) {
        if (name !== null && is(name).instanceOf(String) === false) {
            throw new TypeError("The property's name must be null or a string");
        }
        this.__name = name;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getName = Properties.getName = function () {
        return this.__name;
    }.bind(Properties);

    /**
     * The type of the property. It's recommended to use the Google Closure Compiler
     * types @see https://developers.google.com/closure/compiler/docs/js-for-compiler.
     *
     * If you pass an undefined value, the property can be of any type.
     *
     * @public
     * @param {String|Undefined} type
     * @throws {TypeError}
     * @return {AbstractProperty}
     */
    Public.setType = Properties.setType = function (type) {
        var typeIs = is(type);

        if (typeIs.existent() && typeIs.notInstanceOf(String)) {
            throw new TypeError("The property's type must be undefined, null or a string");
        }
        this.__type = type;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getType = Properties.getType = function () {
        return this.__type;
    }.bind(Properties);

    /**
     * @public
     * @param {String} visibility a string from lib.Visibility
     * @throws {TypeError}
     * @return {AbstractProperty}
     */
    Public.setVisibility = Properties.setVisibility = function (visibility) {
        if (visibility !== null && this.__isAVisibilityType(visibility) === false) {
            throw new TypeError("The new visibility must be null or a value from the Visibility-class");
        }
        this.__visibility = visibility;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getVisibility = Properties.getVisibility = function () {
        return this.__visibility;
    }.bind(Properties);

    /**
     * @public
     * @param {Comment} comment
     * @throws {TypeError}
     * @return {AbstractProperty}
     */
    Public.setComment = Properties.setComment = function (comment) {
        if (comment !== null && is(comment).notInstanceOf(Comment)) {
            throw new TypeError("The comment must be null or an instance of Comment");
        }
        this.__comment = comment;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Comment}
     */
    Public.getComment = Properties.getComment = function () {
        return this.__comment;
    }.bind(Properties);

    /**
     * @public
     * @param {Boolean} value
     * @throws {TypeError}
     * @return {Property}
     */
    Public.setStatic = Properties.setStatic = function (value) {
        if (is(value).notInstanceOf(Boolean)) {
            throw new TypeError("The value must be boolean");
        }
        this.__static = value;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Boolean}
     */
    Public.getStatic = Properties.getStatic = function () {
        return this.__static;
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

module.exports = AbstractProperty;