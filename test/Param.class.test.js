"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    checkError = require("./testHelpers/checkError.js"),
    is = require("../lib/helpers/is"),
    Param = require("../lib/Param.class.js");

describe("Param", function () {

    var instance,
        checkForTypeError = checkError(TypeError);

    beforeEach(function () {
        instance = new Param();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(Param)).to.be(true);
    });
    describe("#setName", function () {
        it("should return the instance", function () {
            expect(instance.setName("param1")).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setName(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setName(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setName(1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setName([]);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setName({});
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setName(function () {});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getName", function () {
        it("should return 'param1'", function () {
            instance.setName("param1");
            expect(instance.getName()).to.be("param1");
        });
        it("should return null", function () {
            expect(instance.getName()).to.be(null);
            instance.setName("param1");
            instance.setName(null);
            expect(instance.getName()).to.be(null);
        });
    });
    describe("#setType", function () {
        it("should return the instance", function () {
            expect(instance.setType("String")).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setType(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setType(null);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setType(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setType(1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setType([]);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setType({});
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setType(function () {});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getType", function () {
        it("should return 'String'", function () {
            instance.setType("String");
            expect(instance.getType()).to.be("String");
        });
        it("should return '*'", function () {
            expect(instance.getType()).to.be("*");
        });
    });
    describe("#setOptional", function () {
        it("should return the instance", function () {
            expect(instance.setOptional(true)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setOptional(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptional("some string");
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptional(1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptionalType([]);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptional({});
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setOptional(function () {});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getOptional", function () {
        it("should return true", function () {
            instance.setOptional(true);
            expect(instance.getOptional()).to.be(true);
        });
        it("should return false", function () {
            expect(instance.getOptional()).to.be(false);
            instance.setOptional(true);
            instance.setOptional(false);
            expect(instance.getOptional()).to.be(false);
        });
    });
});