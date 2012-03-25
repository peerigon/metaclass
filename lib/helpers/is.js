"use strict"; // run code in ES5 strict mode

/** @typedef {{instanceOf: function, notInstanceOf: function, implementing: function, notImplementing: function, existent: function, notExistent: function}} */
var TestingObject;

/**
 * Contains all native types that can't be checked via instanceof
 * @type {Object}
 */
var problematicNativeTypes = {
        "String": String,
        "Boolean": Boolean,
        "Number": Number
    };

/**
 * Tests if the subject is neither undefined nor null
 *
 * @param {*} subject
 * @return {Boolean}
 */
function isExistent(subject) {
    return subject !== undefined && subject !== null;
}

/**
 * Recursive check on Class.Extends for the given SuperClass
 *
 * @param {Function} Class
 * @param {Function} SuperClass
 * @return {Boolean}
 */
function checkExtendsProperty(Class, SuperClass) {
    var Extends = Class.Extends;

    if (typeof Extends === "function") {
        return Extends === SuperClass || checkExtendsProperty(Extends, SuperClass);
    } else {
        return false;
    }
}

/**
 * Returns an object, that provides some methods to test the type of the subject.
 * There is for every test a negated test to improve the readability of your code.
 * So if you want to test for instanceOf() === false just call notInstanceOf().
 *
 * The subject of your test can be every possible value in JavaScript. You don't
 * have to check if it's null or undefined before calling this method.
 *
 * Currently implemented testing methods:
 * <ul>
 *      <li>instanceOf         Usage: is(myObj).instanceOf(MyClass)</li>
 *      <li>notInstanceOf</li>
 *      <li>implementing       Usage: is(myObj).implementing(MyInterface)</li>
 *      <li>notImplementing</li>
 *      <li>set                Usage: is(myObj).set();</li>
 *      <li>notSet</li>
 * </ul>
 *
 * @public
 * @param {*} subject the subject of the test
 * @return {TestingObject}
 */
function is(subject) {
    var subjectType,
        SubjectConstructor;

    if (typeof subject === "undefined" || subject === null) {
        // leave subjectType undefined;
    } else {
        // @see http://bonsaiden.github.com/JavaScript-Garden/#types.typeof
        subjectType = Object.prototype.toString.call(subject).slice(8, -1);
        SubjectConstructor = subject.constructor;
    }

    return {

        /**
         * Tests if the given object is a constructor of the subject. For native
         * types, just pass the corresponding constructor (e.g. String)
         *
         * If the subject.constructor exposes an Extends-property, this will be checked first.
         *
         * @param {!Function} Class
         * @throws {TypeError}
         * @return {Boolean}
         */
        instanceOf: function instanceOf(Class) {
            if (typeof Class !== "function") {
                throw new TypeError("Class must be a constructor function. " +
                    "For native types, pass the corresponding constructor " +
                    "(e.g. String for strings).");
            }

            if (isExistent(subject) === false) {
                return false;
            } else if (checkExtendsProperty(SubjectConstructor, Class)) {
                return true;
            } else if (problematicNativeTypes[subjectType]) {
                return problematicNativeTypes[subjectType] === Class;
            } else {
                return subject instanceof Class;
            }
        },

        /**
         * Tests instanceOf(Class) === false.
         *
         * For further information @see #instanceOf
         *
         * @param {!Object} Class
         */
        notInstanceOf: function notInstanceOf(Class) {
            return this.instanceOf(Class) === false;
        },

        /**
         * Tests if the given subject implements a specific Interface. This
         * function assumes, that the subject offers an Implements-array, that
         * contains all implemented interfaces.
         *
         * @param {!Object} Interface
         * @throws {TypeError}
         * @return {Boolean}
         */
        implementing: function implementing(Interface) {
            var Implements;

            if (typeof Interface !== "object" || Interface === null || Array.isArray(Interface)) {
                throw new TypeError("Interface must be an object");
            }

            if (isExistent(subject) === false) {
                return false;
            }
            Implements = subject.Implements;
            if (Array.isArray(subject.Implements)) {
                return Implements.indexOf(Interface) !== -1;
            } else {
                return false;
            }
        },

        /**
         * Tests implementing(Class) === false.
         *
         * For further information @see #implementing
         *
         * @param {!Object} Interface
         * @throws {TypeError}
         * @return {Boolean}
         */
        notImplementing: function notImplementing(Interface) {
            return this.implementing(Interface) === false;
        },

        /**
         * Tests if the given subject is neither undefined nor null
         *
         * @return {Boolean}
         */
        existent: function existent() {
            return isExistent(subject);
        },

        /**
         * Tests if the given subject is either undefined or null
         *
         * @return {Boolean}
         */
        notExistent: function notExistent() {
            return this.existent() === false;
        }
    };
}

module.exports = is;