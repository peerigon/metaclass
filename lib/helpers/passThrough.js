"use strict"; // run code in ES5 strict mode

/**
 * Adds all functions inherited from the super class to "this". Expects "this" to be
 * bound to the instance, "this.Super" to reference the super class and "this.Public" to
 * reference the public wrapper object
 *
 * If there is no super class to inherit from, nothing happens.
 *
 * IMPORTANT NOTE:
 * If you inherit from a built-in class like String, this function will
 * NOT be able to add these functions, because they are not enumerable. You have to add
 * those manually.
 *
 * @public
 */
module.exports = function passThrough() {
    var key,
        prop,
        Super = this.Super,
        Public = this.Public;

    if (Super !== undefined) {
        for (key in Super) {
            if (Super.hasOwnProperty(key)) {
                prop = Super[key];
                if (typeof prop === "function" &&
                    key !== "constructor" &&
                    Public[key] === undefined) {
                    Public[key] = prop.bind(Super);
                }
            }
        }
    }
};