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

    this.Public = {};

    /**
     * @private
     * @type {js.String}
     */
    this.name = null;

    /**
     * @private
     * @type {lib.Class}
     */
    this.type = null;

    /**
     * @private
     * @type {js.String}
     */
    this.visibility = null;

    /**
     * @private
     * @type {js.String}
     */
    this.comment = null;

    /**
     * Returns true if the given value is one of the constants of the
     * Visibility class.
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
     * @param {js.String} newName
     * @return {lib.AbstractProperty}
     */
    this.setName = this.Public.setName = function (newName) {

        this.name = newName;
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
     * Just pass the metaclass of the type that the property should
     * be. If you pass an undefined value, the property can be of any type.
     *
     * For the native types or nodejs classes like EventEmitter use the meta
     * classes in the folder "types"
     *
     * @public
     * @param {lib.Class} newType
     * @return {lib.AbstractProperty}
     */
    this.setType = this.Public.setType = function (newType) {

        if (newType !== undefined) {
            if ((newType instanceof Class) === false) {
                throw new TypeError("The property's type must be a metaclass");
            }
        }
        this.type = newType;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.Class=undefined}
     */
    this.getType = this.Public.getType = function () {

        return this.type;

    }.bind(this);

    /**
     * @public
     * @param {js.String} newVisibility
     * @return {lib.AbstractProperty}
     */
    this.setVisibility = this.Public.getVisibility = function (newVisibility) {

        if (!this.isAVisibilityType(newVisibility)) {
            throw new TypeError("The new visibility must be a value from the Visibility-class");
        }
        this.visibility = newVisibility;
        return this;

    }.bind(this);

    /**
     * @public
     * @return {js.Number}
     */
    this.getVisibility = this.Public.getVisibility = function () {

        return this.visibility;

    }.bind(this);

    /**
     * @public
     * @param {lib.Comment} newComment
     * @return {lib.AbstractProperty}
     */
    this.setComment = this.Public.setComment = function (newComment) {

        this.comment = newComment;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.String}
     */
    this.getComment = this.Public.getComment = function () {

        return this.comment;

    }.bind(this);

    return this.Public;
}

module.exports = AbstractProperty;