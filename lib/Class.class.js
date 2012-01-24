"use strict"; // run code in ES5 strict mode

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
    this.classId = null;

    /**
     * @public
     * @param {js.String} newClassId
     * @return {lib.Class}
     */
    this.setClassId = this.Public.setClassId = function setClassId(newClassId) {

        this.classId = newClassId;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getClassId = this.Public.setClassId = function getClassId() {

        return this.classId;

    }.bind(this);

    /**
     * @private
     * @type {lib.Class}
     */
    this.parentClass = null;

    /**
     * @public
     * @param {lib.Class} newParentClass
     * @return {lib.Class}
     */
    this.setParentClass = this.Public.setParentClass = function setParentClass(newParentClass) {

        this.parentClass = newParentClass;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.Class}
     */
    this.getParentClass = this.Public.setParentClass = function getParentClass() {

        return this.parentClass;

    }.bind(this);

    return this.Public;
}

module.exports = Class;