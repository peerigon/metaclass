"use strict"; // run code in ES5 strict mode

var instanceOf = require("./instanceOf"),
    passThrough = require("./passThrough");

/**
 * Prepares the instance bound to "this" so you can use class-features like calling instanceOf()
 *
 * @public
 * @param {js.Function=undefined} init the constructor of the class (optional)
 */
module.exports = function construct(init) {

    this.Public.instanceOf = instanceOf.bind(this);
    passThrough.apply(this);

    if (typeof init === "function") {
        init.apply(this);
    }

    return this.Public;

};