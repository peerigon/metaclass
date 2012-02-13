"use strict"; // run code in ES5 strict mode


/**
 * Returns true if the instance bound to "this" is an instance of class or a subclass of class
 *
 * @public
 * @param {js.Function} Class the constructor function
 * @return {js.Boolean}
 */
module.exports = function instanceOf(Class) {
    var Super = this.Super;

    if (this.constructor === Class) {
        return true;
    }
    if (Super === undefined) {
        return false;
    } else {
        if (Super.instanceOf === undefined) {
            return Super instanceof Class;
        } else {
            return Super.instanceOf(Class);
        }
    }
};