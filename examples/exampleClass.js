"use strict";

function A() {}

function B() {}

function C() {}
C.prototype = A.prototype;

function D() {}
D.Extends = A;

// Inconsitent inheritance. Extends should take precedence over prototype.
function E() {}
E.Extends = A;
E.prototype = new B();

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

function is(subject, SuperClass) {
    var subjectType,
        SubjectConstructor;

    if (typeof subject === "undefined" || subject === null) {
        // leave subjectType undefined;
    } else {
        // @see http://bonsaiden.github.com/JavaScript-Garden/#types.typeof
        subjectType = Object.prototype.toString.call(subject).slice(8, -1);
        SubjectConstructor = subject.constructor;
    }
    return checkExtendsProperty(SubjectConstructor, SuperClass);
}