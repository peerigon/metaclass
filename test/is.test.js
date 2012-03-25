"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    nativeFunctions = [Boolean, Number, String, Array, Object, Date, RegExp,
        Error];

describe("is", function () {
    describe("#instanceOf", function () {
        function A() {}

        function B() {}

        function C() {}
        C.prototype = A.prototype;

        function D() {}
        D.Extends = A;

        // Inconsitent inheritance. Prototype should take precedence over Extends.
        // Actually it's not possible the other way round, because checking for
        // e.constructor to get the Extends-prototype does not return E. Instead
        // of it returns the prototype of E, which is the prototype of B.
        function E() {}
        E.Extends = A;
        E.prototype = B.prototype;

        // Inherting a native function
        function MyNativeExtension() {}
        MyNativeExtension.Extends = nativeFunctions[0];

        it("should work with native values", function () {
            var nativesValues = [true, 2, "Hello", [1, 2, 3], {one: "one", two: "two"},
                    new Date(), /hello/gi, new Error()];

            nativesValues.forEach(function (value, index) {
                 expect(is(value).instanceOf(nativeFunctions[index])).to.be(true);
            });
        });
        it("should work when the prototypes are inherting", function () {
            var c = new C(),
                cIs = is(c);

            expect(cIs.instanceOf(A)).to.be(true);
            expect(cIs.instanceOf(C)).to.be(true);
        });
        it("should return true when the object exposes an Extends property", function () {
            var d = new D(),
                dIs = is(d);

            expect(dIs.instanceOf(A)).to.be(true);
            expect(dIs.instanceOf(D)).to.be(true);
        });
        it("Prototype-inheritance should take precedence over Extends-property in a conflicting inheritance case", function () {
            var e = new E(),
                eIs = is(e);

            expect(eIs.instanceOf(B)).to.be(true);
            expect(eIs.instanceOf(E)).to.be(true);
            expect(eIs.instanceOf(A)).to.be(false);
        });
        it("should return true when inheriting native functions", function () {
            var myNativeExtension = new MyNativeExtension(),
                myNativeExtensionIs = is(myNativeExtension);

            nativeFunctions.forEach(function (NativeFunction) {
                MyNativeExtension.Extends = NativeFunction;
                expect(myNativeExtensionIs.instanceOf(NativeFunction)).to.be(true);
            });
            expect(myNativeExtensionIs.instanceOf(MyNativeExtension)).to.be(true);
        });
        it("should return false when the prototypes are not inherting", function () {
            var c = new C(),
                cIs = is(c);

            expect(cIs.instanceOf(B)).to.be(false);
        });
        it("should return false when the object exposes an unfitting Extends property", function () {
            var d = new D(),
                dIs = is(d);

            expect(dIs.instanceOf(B)).to.be(false);
        });
        it("should return false when you check an undefined or null value", function () {
            expect(is(null).instanceOf(B)).to.be(false);
            expect(is(undefined).instanceOf(B)).to.be(false);
        });
        it("should throw an exception when passing a non-function", function () {
            var somethingIs = is("this value doesn't matter");

            expect(
                function () {
                    somethingIs.instanceOf(false);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf(2);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf("hello");
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf([1, 2, 3]);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf({one: 1, two: 2, three: 3});
                }).to.throwException();
        });
    });
    // notInstanceOf is only a negation of instanceOf. But since we have to check
    // the exposed API, we have to write an own, independent test for that.
    // Thank God we only have to negate the test, too.
    describe("#notInstanceOf", function () {

        function A() {}

        function B() {}

        function C() {}
        C.prototype = A.prototype;

        function D() {}
        D.Extends = A;

        // Inconsitent inheritance. Prototype should take precedence over Extends.
        // Actually it's not possible the other way round, because checking for
        // e.constructor to get the Extends-prototype does not return E. Instead
        // of it returns the prototype of E, which is the prototype of B.
        function E() {}
        E.Extends = A;
        E.prototype = B.prototype;

        it("should return true when the prototypes are not inherting", function () {
            var c = new C(),
                cIs = is(c);

            expect(cIs.notInstanceOf(B)).to.be(true);
        });
        it("should return true when the object exposes an unfitting Extends property", function () {
            var d = new D(),
                dIs = is(d);

            expect(dIs.notInstanceOf(B)).to.be(true);
        });
        it("should return true when you check an undefined or null value", function () {
            expect(is(null).notInstanceOf(B)).to.be(true);
            expect(is(undefined).notInstanceOf(B)).to.be(true);
        });
        it("should return true when checking for native functions that are not inherited", function () {
            var d = new D(),
                dIs = is(d);

            nativeFunctions.forEach(function (NativeFunction) {
                if (NativeFunction !== Object) { // of course it's an instance of Object
                    expect(dIs.notInstanceOf(NativeFunction)).to.be(true);
                }
            });
        });
        it("should return false when the prototypes are inherting", function () {
            var c = new C(),
                cIs = is(c);

            expect(cIs.notInstanceOf(A)).to.be(false);
        });
        it("should return false when the object exposes an fitting Extends property", function () {
            var d = new D(),
                dIs = is(d);

            expect(dIs.notInstanceOf(A)).to.be(false);
        });
        it("Prototype-inheritance should take precedence over Extends-property in a conflicting inheritance case", function () {
            var e = new E(),
                eIs = is(e);

            expect(eIs.notInstanceOf(B)).to.be(false);
            expect(eIs.notInstanceOf(A)).to.be(true);
        });
        it("should throw an exception when passing a non-function", function () {
            var somethingIs = is("this value doesn't matter");

            expect(
                function () {
                    somethingIs.instanceOf(false);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf(2);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf("hello");
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf([1, 2, 3]);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.instanceOf({one: 1, two: 2, three: 3});
                }).to.throwException();
        });
    });
    describe("#implementing", function () {
        var MyInterface = {},
            OtherInterface = {};

        function MyClass() {
            this.Implements = [MyInterface];
        }

        it("should return true when the Implements-array contains the Interface", function () {
            var myClass = new MyClass(),
                myClassIs = is(myClass);

            expect(myClassIs.implementing(MyInterface)).to.be(true);
        });
        it("should return false when the Implements-array does not contain the Interface", function () {
            var myClass = new MyClass(),
                myClassIs = is(myClass);

            expect(myClassIs.implementing(OtherInterface)).to.be(false);
        });
        it("should return false when the subject is null or undefined", function () {
            expect(is(null).implementing(OtherInterface)).to.be(false);
            expect(is(undefined).implementing(OtherInterface)).to.be(false);
        });
        it("should throw an exception when passing a non-object", function () {
            var somethingIs = is("this value doesn't matter");

            expect(
                function () {
                    somethingIs.implementing(false);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing(2);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing("hello");
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing([1, 2, 3]);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing(function () {
                    });
                }).to.throwException();
        });
    });
    describe("#notImplementing", function () {
        var MyInterface = {},
            OtherInterface = {};

        function MyClass() {
            this.Implements = [MyInterface];
        }

        it("should return true when the Implements-array does not contains the Interface", function () {
            var myClass = new MyClass(),
                myClassIs = is(myClass);

            expect(myClassIs.notImplementing(OtherInterface)).to.be(true);
        });
        it("should return true when the subject is null or undefined", function () {
            expect(is(null).notImplementing(OtherInterface)).to.be(true);
            expect(is(undefined).notImplementing(OtherInterface)).to.be(true);
        });
        it("should return false when the Implements-array contains the Interface", function () {
            var myClass = new MyClass(),
                myClassIs = is(myClass);

            expect(myClassIs.notImplementing(MyInterface)).to.be(false);
        });
        it("should throw an exception when passing a non-object", function () {
            var somethingIs = is("this value doesn't matter");

            expect(
                function () {
                    somethingIs.implementing(false);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing(2);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing("hello");
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing([1, 2, 3]);
                }).to.throwException();
            expect(
                function () {
                    somethingIs.implementing(function () {
                    });
                }).to.throwException();
        });
    });
    describe("#existent", function () {
        it("should return true, when the value is neither null nor undefined", function () {
            expect(is(false).existent()).to.be(true);
            expect(is(2).existent()).to.be(true);
            expect(is("hello").existent()).to.be(true);
            expect(is([1, 2, 3]).existent()).to.be(true);
            expect(is({one: 1, two: 2, three: 3}).existent()).to.be(true);
            expect(is(
                function () {
                }).existent()).to.be(true);
            expect(is(new Date()).existent()).to.be(true);
            expect(is(/hello/gi).existent()).to.be(true);
            expect(is(new Error()).existent()).to.be(true);
        });
        it("should return false, when the value is either null or undefined", function () {
            expect(is(null).existent()).to.be(false);
            expect(is(undefined).existent()).to.be(false);
        });
    });
    describe("#notExistent", function () {
        it("should return true, when the value is either null or undefined", function () {
            expect(is(null).notExistent()).to.be(true);
            expect(is(undefined).notExistent()).to.be(true);
        });
        it("should return false, when the value is neither null nor undefined", function () {
            expect(is(false).notExistent()).to.be(false);
            expect(is(2).notExistent()).to.be(false);
            expect(is("hello").notExistent()).to.be(false);
            expect(is([1, 2, 3]).notExistent()).to.be(false);
            expect(is({one: 1, two: 2, three: 3}).notExistent()).to.be(false);
            expect(is(
                function () {
                }).notExistent()).to.be(false);
            expect(is(new Date()).notExistent()).to.be(false);
            expect(is(/hello/gi).notExistent()).to.be(false);
            expect(is(new Error()).notExistent()).to.be(false);
        });
    });
});