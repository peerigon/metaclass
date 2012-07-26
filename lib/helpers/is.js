"use strict"; // run code in ES5 strict mode

/** @typedef {{instanceOf: function, notInstanceOf: function, implementing: function, notImplementing: function, existent: function, notExistent: function}} */
var TestingObject;

/**
 * Contains all native types that can't be checked via instanceof
 *
 * @type {!Object}
 */
var problematicNativeTypes = {
        "String": String,
        "Boolean": Boolean,
        "Number": Number
    };

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
 * Returns true if the function contains native code.
 *
 * @param {!Function} subject
 * @return {Boolean}
 */
function containsNativeCode(subject) {
    var src = subject.toString();

    return src.search(/^function \w+\(\) \{\s*\[native code\]\s*\}$/) !== -1;
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
 *
 * - instanceOf         Usage: is(myObj).instanceOf(MyClass)
 * - notInstanceOf
 * - implementing       Usage: is(myObj).implementing(MyInterface)
 * - notImplementing
 * - existent           Usage: is(myObj).existent();
 * - notExistent
 * - nativeConstructor  Usage: is(myObj).nativeConstructor();
 * - notNativeConstructor
 *
 * @public
 * @param {*} subject the subject of the test
 * @return {TestingObject}
 */
function is(subject) {
    var subjectType,
        SubjectConstructor,
        isExistent,
        isNativeConstructor;

    if (typeof subject === "undefined" || subject === null) {
        subjectType = SubjectConstructor = null;
        isExistent = false;
    } else {
        // @see http://bonsaiden.github.com/JavaScript-Garden/#types.typeof
        subjectType = Object.prototype.toString.call(subject).slice(8, -1);
        SubjectConstructor = subject.constructor;
        isExistent = true;
    }

    return {
        /**
         * The constructor function of the subject. If the subject is null
         * or undefined, this property is null
         *
         * @type {Function}
         */
        constructedBy: SubjectConstructor,

        /**
         * Returns true if the given subject is neither undefined nor null
         *
         * @return {Boolean}
         */
        existent: function () {
            return isExistent;
        },

        /**
         * Returns true if the given subject is either undefined or null
         *
         * @return {Boolean}
         */
        notExistent: function () {
            return !isExistent;
        },

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
        instanceOf: function (Class) {
            if (typeof Class !== "function") {
                throw new TypeError("Class must be a constructor function. " +
                    "For native types, pass the corresponding constructor " +
                    "(e.g. String for strings).");
            }

            if (isExistent === false) {
                return false;
            } else if (subject instanceof Class) {
                return true;
            } else if (checkExtendsProperty(SubjectConstructor, Class)) {
                return true;
            } else if (problematicNativeTypes[subjectType]) {
                return problematicNativeTypes[subjectType] === Class;
            } else {
                return false;
            }
        },

        /**
         * Tests instanceOf(Class) === false.
         *
         * For further information @see #instanceOf
         *
         * @param {!Object} Class
         */
        notInstanceOf: function (Class) {
            return this.instanceOf(Class) === false;
        },

        /**
         * Tests if the given subject implements a specific Interface. This
         * function assumes, that the subject's constructor offers an Implements-array,
         * that contains all implemented interfaces.
         *
         * @param {!Object} Interface
         * @throws {TypeError}
         * @return {Boolean}
         */
        implementing: function (Interface) {
            var Implements;

            if (typeof Interface !== "object" || Interface === null || Array.isArray(Interface)) {
                throw new TypeError("Interface must be an object");
            }

            if (isExistent === false) {
                return false;
            }
            Implements = SubjectConstructor.Implements;
            if (Array.isArray(Implements)) {
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
        notImplementing: function (Interface) {
            return this.implementing(Interface) === false;
        },

        /**
         * Tests if the given subject is a constructor-function with
         * native code like Boolean, Number, String, etc.
         *
         * @return {Boolean)
         */
        nativeConstructor: function () {
            if (isNativeConstructor === undefined) {
                if (subject instanceof Function) {
                    isNativeConstructor = containsNativeCode(subject);
                } else {
                    isNativeConstructor = false;
                }
            }

            return isNativeConstructor;
        },

        /**
         * Tests nativeConstructor() === false.
         * For further information @see #nativeConstructor
         *
         * @return {Boolean}
         */
        notNativeConstructor: function () {
            return this.nativeConstructor() === false;
        }
    };
}

module.exports = is;