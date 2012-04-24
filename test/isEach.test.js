"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    isEach = require("../lib/helpers/isEach"),
    checkError = require("./testHelpers/checkError.js"),
    checkForTypeError = checkError(TypeError),
    checkForError = checkError(Error);

describe("isEach", function () {
    var exampleSubjectsArr,
        exampleSubjectsObj,
        abortEach, // if this is true, the loop shall be break
        // these vars get updated everytime the mock is called. this only works because all tests are synchronous
        funcsCalled,
        subjectsPassed,
        argsPassed;

    function isMock(subject) {
        subjectsPassed.push(subject);
        return {
            existent: function (arg1) {
                funcsCalled.push("existent");
                argsPassed.push(arg1);
                return abortEach === false && is(subject).existent();
            },
            notExistent: function (arg1) {
                funcsCalled.push("notExistent");
                argsPassed.push(arg1);
                return abortEach === false && is(subject).notExistent();
            },
            instanceOf: function (Class) {
                funcsCalled.push("instanceOf");
                argsPassed.push(Class);
                return abortEach === false && is(subject).instanceOf(Class);
            },
            notInstanceOf: function (Class) {
                funcsCalled.push("notInstanceOf");
                argsPassed.push(Class);
                return abortEach === false && is(subject).notInstanceOf(Class);
            },
            implementing: function (Interface) {
                funcsCalled.push("implementing");
                argsPassed.push(Interface);
                return abortEach === false && is(subject).implementing(Interface);
            },
            notImplementing: function (Interface) {
                funcsCalled.push("notImplementing");
                argsPassed.push(Interface);
                return abortEach === false && is(subject).notImplementing(Interface);
            },
            nativeConstructor: function (arg1) {
                funcsCalled.push("nativeConstructor");
                argsPassed.push(arg1);
                return abortEach === false && is(subject).nativeConstructor();
            },
            notNativeConstructor: function (arg1) {
                funcsCalled.push("notNativeConstructor");
                argsPassed.push(arg1);
                return abortEach === false && is(subject).notNativeConstructor();
            }
        };
    }

    before(function () {
        isEach.__inject({is: isMock});  // injecting mock
    });
    beforeEach(function () {
        subjectsPassed = [];
        funcsCalled = [];
        argsPassed = [];
    });
    describe("#existent", function () {
        function A() {}
        function B() {}
        function C() {}

        before(function () {
            exampleSubjectsArr = [A, B, C];
            exampleSubjectsObj = {A: A, B: B, C: C};
        });
        it("should call on every item in exampleSubjectArr method #existent()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).existent();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["existent", "existent", "existent"]);
            expect(argsPassed).to.eql([undefined, undefined, undefined]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).existent();
            expect(subjectsPassed).to.eql([A]);
        });
        it("should call on every item in exampleSubjectObj method #existent()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).existent();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["existent", "existent", "existent"]);
            expect(argsPassed).to.eql([undefined, undefined, undefined]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).existent();
            expect(subjectsPassed).to.eql([A]);
        });
        it("should throw a TypeError on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).existent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).existent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).existent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).existent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").existent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).existent();
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#notExistent", function () {
        before(function () {
            exampleSubjectsArr = [null, undefined, null];
            exampleSubjectsObj = {A: null, B: undefined, C: null};
        });
        it("should call on every item in exampleSubjectArr method #notExistent()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).notExistent();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notExistent", "notExistent", "notExistent"]);
            expect(argsPassed).to.eql([undefined, undefined, undefined]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).notExistent();
            expect(subjectsPassed).to.eql([null]);
        });
        it("should call on every item in exampleSubjectObj method #notExistent()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).notExistent();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notExistent", "notExistent", "notExistent"]);
            expect(argsPassed).to.eql([undefined, undefined, undefined]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).notExistent();
            expect(subjectsPassed).to.eql([null]);
        });
        it("should return false on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).notExistent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).notExistent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).notExistent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).notExistent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").notExistent();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).notExistent();
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#instanceOf", function () {
        function A() {}
        function B() {}
        function C() {}
        function SuperClass() {}

        before(function () {
            A.prototype = SuperClass.prototype;
            B.prototype = SuperClass.prototype;
            C.prototype = SuperClass.prototype;
            exampleSubjectsArr = [new A(), new B(), new C()];
            exampleSubjectsObj = {A: new A(), B: new B(), C: new C()};
        });
        it("should call on every item in exampleSubjectArr method #instanceOf()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).instanceOf(SuperClass);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["instanceOf", "instanceOf", "instanceOf"]);
            expect(argsPassed).to.eql([SuperClass, SuperClass, SuperClass]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).instanceOf(SuperClass);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should call on every item in exampleSubjectObj method #instanceOf()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).instanceOf(SuperClass);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["instanceOf", "instanceOf", "instanceOf"]);
            expect(argsPassed).to.eql([SuperClass, SuperClass, SuperClass]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).instanceOf(SuperClass);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should return false on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).instanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).instanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).instanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).instanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").instanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).instanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#notInstanceOf", function () {
        function A() {}
        function B() {}
        function C() {}
        function SuperClass() {}

        before(function () {
            exampleSubjectsArr = [new A(), new B(), new C()];
            exampleSubjectsObj = {A: new A(), B: new B(), C: new C()};
        });
        it("should call on every item in exampleSubjectArr method #notInstanceOf()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).notInstanceOf(SuperClass);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notInstanceOf", "notInstanceOf", "notInstanceOf"]);
            expect(argsPassed).to.eql([SuperClass, SuperClass, SuperClass]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).notInstanceOf(SuperClass);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should call on every item in exampleSubjectObj method #notInstanceOf()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).notInstanceOf(SuperClass);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notInstanceOf", "notInstanceOf", "notInstanceOf"]);
            expect(argsPassed).to.eql([SuperClass, SuperClass, SuperClass]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).notInstanceOf(SuperClass);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should return false on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).notInstanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).notInstanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).notInstanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).notInstanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").notInstanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).notInstanceOf(SuperClass);
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#implementing", function () {
        var Interface = {};

        function A() {}
        function B() {}
        function C() {}

        before(function () {
            A.Implements = [Interface];
            B.Implements = [Interface];
            C.Implements = [Interface];
            exampleSubjectsArr = [new A(), new B(), new C()];
            exampleSubjectsObj = {A: new A(), B: new B(), C: new C()};
        });
        it("should call on every item in exampleSubjectArr method #implementing()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).implementing(Interface);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["implementing", "implementing", "implementing"]);
            expect(argsPassed).to.eql([Interface, Interface, Interface]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).implementing(Interface);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should call on every item in exampleSubjectObj method #implementing()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).implementing(Interface);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["implementing", "implementing", "implementing"]);
            expect(argsPassed).to.eql([Interface, Interface, Interface]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).implementing(Interface);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should return false on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).implementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).implementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).implementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).implementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").implementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).implementing(Interface);
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#notImplementing", function () {
        var Interface = {},
            OtherInterface = {};

        function A() {}
        function B() {}
        function C() {}

        before(function () {
            A.Implements = [OtherInterface];
            B.Implements = [OtherInterface];
            C.Implements = [OtherInterface];
            exampleSubjectsArr = [new A(), new B(), new C()];
            exampleSubjectsObj = {A: new A(), B: new B(), C: new C()};
        });
        it("should call on every item in exampleSubjectArr method #notImplementing()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).notImplementing(Interface);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notImplementing", "notImplementing", "notImplementing"]);
            expect(argsPassed).to.eql([Interface, Interface, Interface]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).notImplementing(Interface);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should call on every item in exampleSubjectObj method #notImplementing()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).notImplementing(Interface);
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notImplementing", "notImplementing", "notImplementing"]);
            expect(argsPassed).to.eql([Interface, Interface, Interface]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).notImplementing(Interface);
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should return false on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).notImplementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).notImplementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).notImplementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).notImplementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").notImplementing(Interface);
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).notImplementing(Interface);
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#nativeConstructor", function () {
        before(function () {
            exampleSubjectsArr = [Boolean, Number, String, Function, Array, Object, Date, RegExp];
            exampleSubjectsObj = {B: Boolean, N: Number, S: String, F: Function, A: Array, O: Object, D: Date, R: RegExp};
        });
        it("should call on every item in exampleSubjectArr method #nativeConstructor()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).nativeConstructor();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql([
                "nativeConstructor", "nativeConstructor", "nativeConstructor",
                "nativeConstructor", "nativeConstructor", "nativeConstructor",
                "nativeConstructor", "nativeConstructor"]
            );
            expect(argsPassed).to.eql([
                undefined, undefined, undefined,
                undefined, undefined, undefined,
                undefined, undefined]
            );
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).nativeConstructor();
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should call on every item in exampleSubjectObj method #nativeConstructor()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).nativeConstructor();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql([
                "nativeConstructor", "nativeConstructor", "nativeConstructor",
                "nativeConstructor", "nativeConstructor", "nativeConstructor",
                "nativeConstructor", "nativeConstructor"]
            );
            expect(argsPassed).to.eql([
                undefined, undefined, undefined,
                undefined, undefined, undefined,
                undefined, undefined]
            );
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).nativeConstructor();
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should return false on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).nativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).nativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).nativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).nativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").nativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).nativeConstructor();
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#notNativeConstructor", function () {
        function A() {}
        function B() {}
        function C() {}

        before(function () {
            exampleSubjectsArr = [A, B, C];
            exampleSubjectsObj = {A: A, B: B, C: C};
        });
        it("should call on every item in exampleSubjectArr method #notNativeConstructor()", function () {
            abortEach = false;
            isEach(exampleSubjectsArr).notNativeConstructor();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notNativeConstructor", "notNativeConstructor", "notNativeConstructor"]);
            expect(argsPassed).to.eql([undefined, undefined, undefined]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsArr).notNativeConstructor();
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should call on every item in exampleSubjectObj method #notNativeConstructor()", function () {
            abortEach = false;
            isEach(exampleSubjectsObj).notNativeConstructor();
            expect(subjectsPassed).to.eql(exampleSubjectsArr);
            expect(funcsCalled).to.eql(["notNativeConstructor", "notNativeConstructor", "notNativeConstructor"]);
            expect(argsPassed).to.eql([undefined, undefined, undefined]);
        });
        it("should break the loop as soon as possible", function () {
            abortEach = true;
            isEach(exampleSubjectsObj).notNativeConstructor();
            expect(subjectsPassed).to.eql([exampleSubjectsArr[0]]);
        });
        it("should return false on non-collections", function () {
            abortEach = false;
            expect(function () {
                isEach(undefined).notNativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(null).notNativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(true).notNativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(2).notNativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach("hello").notNativeConstructor();
            }).to.throwException(checkForTypeError);
            expect(function () {
                isEach(function () {}).notNativeConstructor();
            }).to.throwException(checkForTypeError);
        });
    });
});