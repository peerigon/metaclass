"use strict"; // run code in ES5 strict mode

var Visibility = require("./Visibility.class"),
    Class = require("./Class.class");

/**
 * Represents a class property without implementation code.
 *
 * @class AbstractProperty
 */
function AbstractProperty() {
    var self = this;

    /**
     * @private
     * @type {js.String}
     */
    this.name = null;

    /**
     * @private
     * @type {lib.Class}
     */
    this.type = undefined;

    /**
     * @private
     * @type {js.String}
     */
    this.visibility = null;

    /**
     * @private
     * @type {lib.Comment}
     */
    this.comment = null;

    /**
     * Returns true if the given value is one of the Visibility class' constants
     *
     * @private
     * @param {js.String} visibilityType
     * @return {js.Boolean}
     */
    this.isAVisibilityType = function (visibilityType) {

        return visibilityType === Visibility.PUBLIC ||
            visibilityType === Visibility.PROTECTED ||
            visibilityType === Visibility.PRIVATE;

    }.bind(this);

    /**
     * @public
     * @param {js.String} name
     * @return {lib.AbstractProperty}
     */
    this.setName = this.Public.setName = function (name) {

        this.name = name;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getName = this.Public.getName = function () {

        return this.name;

    }.bind(this);

    /**
     * Just pass the classId of the type, that the property shouild be.
     *
     * - For every Class within the package, it's e.g. lib.folder1.Class1.
     * - For every Class outside the package, it's e.g. moduleName.Class1
     * - For every native class it's e.g. js.Function
     * - For every node class it's e.g. node.EventEmitter
     *
     * If you pass an undefined value, the property can be of any type.
     *
     * @public
     * @param {js.String} type
     * @return {lib.AbstractProperty}
     */
    this.setType = this.Public.setType = function (type) {

        if (type !== undefined) {
            if (typeof newType !== "string") {
                throw new TypeError("The property's type must be a string");
            }
        }
        this.type = type;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.String=undefined}
     */
    this.getType = this.Public.getType = function () {

        return this.type;

    }.bind(this);

    /**
     * @public
     * @param {js.String} visibility a string from lib.Visibility
     * @return {lib.AbstractProperty}
     */
    this.setVisibility = this.Public.setVisibility = function (visibility) {

        if (!this.isAVisibilityType(visibility)) {
            throw new TypeError("The new visibility must be a value from the Visibility-class");
        }
        this.visibility = visibility;
        return this;

    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getVisibility = this.Public.getVisibility = function () {

        return this.visibility;

    }.bind(this);

    /**
     * @public
     * @param {lib.Comment} comment
     * @return {lib.AbstractProperty}
     */
    this.setComment = this.Public.setComment = function (comment) {

        this.comment = comment;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.Comment}
     */
    this.getComment = this.Public.getComment = function () {

        return this.comment;

    }.bind(this);

    return this.Public;
}

module.exports = AbstractProperty;