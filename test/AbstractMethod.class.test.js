"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    checkError = require("./testHelpers/checkError.js"),
    AbstractMethod = require("../lib/AbstractMethod.class"),
    AbstractProperty = require("../lib/AbstractProperty.class"),
    Param = require("../lib/Param.class.js");

describe("Method", function () {

    var instance,
        checkForTypeError = checkError(TypeError),
        checkForRangeError = checkError(RangeError),
        checkForError = checkError(Error);

    beforeEach(function () {
        instance = new AbstractMethod();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(AbstractMethod)).to.be(true);
        expect(is(instance).instanceOf(AbstractProperty)).to.be(true);
    });
    describe("#setRequiredParam", function () {
        var param1,
            param2,
            param3;

        before(function () {
            param1 = new Param();
            param2 = new Param();
            param3 = new Param();
        });
        it("should return the instance", function () {
            expect(instance.setRequiredParam(0, param1)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setRequiredParam(undefined, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(null, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(true, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(-1, param1);
            }).to.throwException(checkForRangeError);
            expect(function () {
                instance.setRequiredParam(1, param1);
            }).to.throwException(checkForRangeError);
            expect(function () {
                instance.setRequiredParam("string", param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam({}, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(0, undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(0, true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(0, 0);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(0, "some string");
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(0, []);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setRequiredParam(0, {});
            }).to.throwException(checkForTypeError);
            expect(function () {
                var param = new Param();

                param.setOptional(true);
                instance.setRequiredParam(0, param);
            }).to.throwException(checkForError);
        });
    });
    describe("#getRequiredParams", function () {
        var param1,
            param2,
            param3;

        before(function () {
            param1 = new Param();
            param2 = new Param();
            param3 = new Param();
        });
        it("should return the required params", function () {
            instance.setRequiredParam(0, param1);
            instance.setRequiredParam(1, param2);
            instance.setRequiredParam(2, param3);
            expect(instance.getRequiredParams()).to.eql([param1, param2, param3]);
            instance.setRequiredParam(0, null);
            expect(instance.getRequiredParams()).to.eql([param2, param3]);
        });
        it("should return []", function () {
            expect(instance.getRequiredParams()).to.eql([]);
            instance.setRequiredParam(0, param1);
            instance.setRequiredParam(0, null);
            expect(instance.getRequiredParams()).to.eql([]);
        });
        it("should return an indepedent copy", function () {
            var firstCopy,
                secondCopy;

            instance.setRequiredParam(0, param1);
            instance.setRequiredParam(1, param2);
            firstCopy = instance.getRequiredParams();
            firstCopy.splice(1, 1); // manipulate array
            secondCopy = instance.getRequiredParams();
            expect(firstCopy).to.have.length(1);
            expect(secondCopy).to.have.length(2);
        });
    });
    describe("#setOptionalParam", function () {
        var param1,
            param2,
            param3;

        before(function () {
            param1 = new Param();
            param2 = new Param();
            param3 = new Param();

            param1.setOptional(true);
            param2.setOptional(true);
            param3.setOptional(true);
        });
        it("should return the instance", function () {
            expect(instance.setOptionalParam(0, param1)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setOptionalParam(undefined, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(null, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(true, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(-1, param1);
            }).to.throwException(checkForRangeError);
            expect(function () {
                instance.setOptionalParam(1, param1);
            }).to.throwException(checkForRangeError);
            expect(function () {
                instance.setOptionalParam("string", param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam({}, param1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(0, undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(0, true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(0, 0);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(0, "some string");
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(0, []);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalParam(0, {});
            }).to.throwException(checkForTypeError);
            expect(function () {
                var param = new Param();

                instance.setOptionalParam(0, param);
            }).to.throwException(checkForError);
        });
    });
    describe("#getOptionalParams", function () {
        var param1,
            param2,
            param3;

        before(function () {
            param1 = new Param();
            param2 = new Param();
            param3 = new Param();

            param1.setOptional(true);
            param2.setOptional(true);
            param3.setOptional(true);
        });
        it("should return the required params", function () {
            instance.setOptionalParam(0, param1);
            instance.setOptionalParam(1, param2);
            instance.setOptionalParam(2, param3);
            expect(instance.getOptionalParams()).to.eql([param1, param2, param3]);
            instance.setOptionalParam(0, null);
            expect(instance.getOptionalParams()).to.eql([param2, param3]);
        });
        it("should return []", function () {
            expect(instance.getOptionalParams()).to.eql([]);
            instance.setOptionalParam(0, param1);
            instance.setOptionalParam(0, null);
            expect(instance.getOptionalParams()).to.eql([]);
        });
        it("should return an indepedent copy", function () {
            var firstCopy,
                secondCopy;

            instance.setOptionalParam(0, param1);
            instance.setOptionalParam(1, param2);
            firstCopy = instance.getOptionalParams();
            firstCopy.splice(1, 1); // manipulate array
            secondCopy = instance.getOptionalParams();
            expect(firstCopy).to.have.length(1);
            expect(secondCopy).to.have.length(2);
        });
    });
    describe("#getNumOfRequiredParams", function () {
        var param1,
            param2,
            param3,
            optionalParam1;

        before(function () {
            param1 = new Param();
            param2 = new Param();
            param3 = new Param();

            optionalParam1 = new Param();
            optionalParam1.setOptional(true);
        });
        it("should return 0", function () {
            expect(instance.getNumOfRequiredParams()).to.be(0);
        });
        it("should return 2", function () {
            instance.setRequiredParam(0, param1);
            instance.setRequiredParam(1, param2);
            instance.setRequiredParam(2, param3);
            instance.setOptionalParam(0, optionalParam1);
            expect(instance.getNumOfRequiredParams()).to.eql(3);
            instance.setRequiredParam(0, null);
            expect(instance.getNumOfRequiredParams()).to.eql(2);
        });
    });
    describe("#getNumOfParams", function () {
        var param1,
            param2,
            optionalParam1;

        before(function () {
            param1 = new Param();
            param2 = new Param();
            optionalParam1 = new Param();

            optionalParam1.setOptional(true);
        });
        it("should return 0", function () {
            expect(instance.getNumOfParams()).to.be(0);
        });
        it("should return 2", function () {
            instance.setRequiredParam(0, param1);
            instance.setRequiredParam(1, param2);
            instance.setOptionalParam(0, optionalParam1);
            expect(instance.getNumOfParams()).to.eql(3);
            instance.setRequiredParam(1, null);
            expect(instance.getNumOfParams()).to.eql(2);
        });
    });
    describe("#isAbstract", function () {
        it("should return true", function () {
            expect(instance.isAbstract()).to.be(true);
        });
    });
});