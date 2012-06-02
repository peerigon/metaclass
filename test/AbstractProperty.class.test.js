"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    AbstractProperty = require("../lib/AbstractProperty.class"),
    Visibility = require("../lib/Visibility.class"),
    Comment = require("../lib/Comment.class");

describe("AbstractProperty", function () {

    var instance;

    beforeEach(function () {
        instance = new AbstractProperty();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(AbstractProperty)).to.be(true);
    });
    describe("#setName", function () {
        it("should return the instance", function () {
            expect(instance.setName("Batti")).to.be(instance);
            expect(instance.setName(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setName(undefined);
            }).to.throwException();
            expect(function () {
                instance.setType(true);
            }).to.throwException();
            expect(function () {
                instance.setType(2);
            }).to.throwException();
            expect(function () {
                instance.setType({});
            }).to.throwException();
        });
    });
    describe("#getName", function () {
        it("should return null", function () {
            expect(instance.getName()).to.be(null);
            instance.setName("Batti");
            instance.setName(null);
            expect(instance.getName()).to.be(null);
        });
        it("should return Batti", function () {
            instance.setName("Batti");
            expect(instance.getName()).to.be("Batti");
        });
    });
    describe("#setType", function () {
        it("should return the instance", function () {
            expect(instance.setType("Array")).to.be(instance);
            expect(instance.setType(Array)).to.be(instance);
            expect(instance.setType(undefined)).to.be(instance);
            expect(instance.setType(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setType(true);
            }).to.throwException();
            expect(function () {
                instance.setType(1);
            }).to.throwException();
            expect(function () {
                instance.setType([]);
            }).to.throwException();
            expect(function () {
                instance.setType({});
            }).to.throwException();
        });
    });
    describe("#getType", function () {
        it("should return 'Array'", function () {
            instance.setType("Array");
            expect(instance.getType()).to.be("Array");
        });
        it("should return Array", function () {
            instance.setType(Array);
            expect(instance.getType()).to.be(Array);
        });
        it("should return undefined", function () {
            instance.setType(undefined);
            expect(instance.getType()).to.be(undefined);
        });
        it("should return null", function () {
            expect(instance.getType()).to.be(null);
            instance.setType("js.Boolean");
            instance.setType(null);
            expect(instance.getType()).to.be(null);
        });
    });
    describe("#setVisibility", function () {
        it("should return the instance", function () {
            expect(instance.setVisibility(Visibility.PUBLIC)).to.be(instance);
            expect(instance.setVisibility(Visibility.PROTECTED)).to.be(instance);
            expect(instance.setVisibility(Visibility.PRIVATE)).to.be(instance);
            expect(instance.setVisibility(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setVisibility(undefined);
            }).to.throwException();
            expect(function () {
                instance.setVisibility(true);
            }).to.throwException();
            expect(function () {
                instance.setVisibility(1);
            }).to.throwException();
            expect(function () {
                instance.setVisibility("some other string");
            }).to.throwException();
            expect(function () {
                instance.setVisibility([]);
            }).to.throwException();
        });
    });
    describe("#getVisibility", function () {
        it("should return null", function () {
            expect(instance.getVisibility()).to.be(null);
            instance.setVisibility(Visibility.PRIVATE);
            instance.setVisibility(null);
            expect(instance.getVisibility()).to.be(null);
        });
        it("should return Visibility.PUBLIC", function () {
            instance.setVisibility(Visibility.PRIVATE);
            expect(instance.getVisibility()).to.be(Visibility.PRIVATE);
        });
    });
    describe("#setComment", function () {
        it("should return the instance", function () {
            expect(instance.setComment(new Comment())).to.be(instance);
            expect(instance.setComment(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setComment(undefined);
            }).to.throwException();
            expect(function () {
                instance.setComment(true);
            }).to.throwException();
            expect(function () {
                instance.setComment(1);
            }).to.throwException();
            expect(function () {
                instance.setComment("some string");
            }).to.throwException();
            expect(function () {
                instance.setComment([]);
            }).to.throwException();
            expect(function () {
                instance.setComment({});
            }).to.throwException();
        });
    });
    describe("#getComment", function () {
        it("should return null", function () {
            expect(instance.getComment()).to.be(null);
            instance.setComment(new Comment());
            instance.setComment(null);
            expect(instance.getComment()).to.be(null);
        });
        it("should return the comment object", function () {
            var comment = new Comment();
            instance.setComment(comment);
            expect(instance.getComment()).to.be(comment);
        });
    });
    describe("#setStatic", function () {
        it("should return the instance", function () {
            expect(instance.setStatic(true)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setStatic(undefined);
            }).to.throwException();
            expect(function () {
                instance.setStatic(null);
            }).to.throwException();
            expect(function () {
                instance.setStatic(1);
            }).to.throwException();
            expect(function () {
                instance.setStatic("Jude");
            }).to.throwException();
            expect(function () {
                instance.setStatic({});
            }).to.throwException();
        });
    });
    describe("#getStatic", function () {
        it("should return true", function () {
            instance.setStatic(true);
            expect(instance.getStatic()).to.be(true);
        });
        it("should return false", function () {
            expect(instance.getStatic()).to.be(false);
        });
    });
    describe("#isAbstract", function () {
        it("should return true", function () {
            expect(instance.isAbstract()).to.be(true);
        });
    });
});