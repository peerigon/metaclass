"use strict"; // run code in ES5 strict mode

var is = require("./is");

function isEach(subjectCollection) {
    function call(funcToCall, arg) {
        var key,
            currentSubject,
            result;

        if (Array.isArray(subjectCollection)) {
            return subjectCollection.every(function (subject) {
                 return is(subject)[funcToCall](arg);
            });
        } else if (subjectCollection !== null && typeof subjectCollection === "object") {
            result = true;
            for (key in subjectCollection) {
                if (subjectCollection.hasOwnProperty(key)) {
                    currentSubject = subjectCollection[key];
                    if (is(currentSubject)[funcToCall](arg) === false) {
                        result = false;
                        break;
                    }
                }
            }
            return result;
        } else {
            throw new TypeError("isEach only accepts arrays or objects");
        }
    }

    return {
        /**
         * Calls is(subject).existent() on every item in the array
         *
         * @return {Boolean}
         */
        existent: function () {
            return call("existent");
        },

        /**
         * Calls is(subject).notExistent() on every item in the array
         *
         * @return {Boolean}
         */
        notExistent: function () {
            return call("notExistent");
        },

        /**
         * Calls is(subject).instanceOf() on every item in the array
         *
         * @param {!Function} Class
         * @throws {TypeError}
         * @return {Boolean}
         */
        instanceOf: function (Class) {
            return call("instanceOf", Class);
        },

        /**
         * Calls is(subject).notInstanceOf() on every item in the array
         *
         * @param {!Object} Class
         */
        notInstanceOf: function (Class) {
            return call("notInstanceOf", Class);
        },

        /**
         * Calls is(subject).implementing() on every item in the array
         *
         * @param {!Object} Interface
         * @throws {TypeError}
         * @return {Boolean}
         */
        implementing: function (Interface) {
            return call("implementing", Interface);
        },

        /**
         * Calls is(subject).notImplementing() on every item in the array
         *
         * @param {!Object} Interface
         * @throws {TypeError}
         * @return {Boolean}
         */
        notImplementing: function (Interface) {
            return call("notImplementing", Interface);
        },

        /**
         * Calls is(subject).nativeConstructor() on every item in the array
         *
         * @return {Boolean)
         */
        nativeConstructor: function () {
            return call("nativeConstructor");
        },

        /**
         * Calls is(subject).notNativeConstructor() on every item in the array
         *
         * @return {Boolean}
         */
        notNativeConstructor: function () {
            return call("notNativeConstructor");
        }
    };
}

isEach.__inject = function (deps) {
    is = deps.is || is;
};

module.exports = isEach;