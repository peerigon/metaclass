"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    Comment = require("../lib/Comment.class");

describe("Comment", function () {

    var instance;

    beforeEach(function () {
        instance = new Comment();
    });
    it("should return true", function () {
        expect(instance.instanceOf(Comment)).to.be(true);
        expect(instance.instanceOf(String)).to.be(true);
    });
    describe("#setDescription", function () {
        it("should return the instance", function () {
            expect(instance.setDescription("Hello")).to.be(instance);
            expect(instance.setDescription(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setDescription(undefined);
            }).to.throwException();
            expect(function () {
                instance.setVisibility(1);
            }).to.throwException();
            expect(function () {
                instance.setVisibility({});
            }).to.throwException();
            expect(function () {
                instance.setVisibility([]);
            }).to.throwException();
        });
    });
    describe("#getDescription", function () {
        it("should return 'Hello\n'", function () {
            instance.setDescription("Hello");
            expect(instance.getDescription()).to.be("Hello\n");
        });
        it("should return null", function () {
            expect(instance.getDescription()).to.be(null);
            instance.setDescription("Hello");
            instance.setDescription(null);
            expect(instance.getDescription()).to.be(null);
        });
    });
    describe("#setTag", function () {
        it("should return the instance", function () {
            expect(instance.setTag("param", "{js.String} bla")).to.be(instance);
            expect(instance.setTag("param", null)).to.be(instance);
            expect(instance.setTag("param", "")).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setTag(null, "bla");
            }).to.throwException();
            expect(function () {
                instance.setTag(undefined, "bla");
            }).to.throwException();
            expect(function () {
                instance.setTag(1, "bla");
            }).to.throwException();
            expect(function () {
                instance.setTag({}, "bla");
            }).to.throwException();
            expect(function () {
                instance.setTag("return", undefined);
            }).to.throwException();
            expect(function () {
                instance.setTag("return", 1);
            }).to.throwException();
            expect(function () {
                instance.setTag("return", {});
            }).to.throwException();
        });
    });
    describe("#getTag", function () {
        it("should return '{js.String}'", function () {
            instance.setTag("param", "{js.String}");
            expect(instance.getTag("param")).to.be("{js.String}");
        });
        it("should return ''", function () {
            instance.setTag("public", "");
            expect(instance.getTag("public")).to.be("");
        });
        it("should return undefined", function () {
            expect(instance.getTag("public")).to.be(undefined);
            expect(instance.getTag("param")).to.be(undefined);
            instance.setTag("param", "{js.Boolean}");
            expect(instance.getTag("public")).to.be(undefined);
        });
        it("should return null", function () {
            instance.setTag("param", "{js.Boolean}");
            instance.setTag("param", null);
            expect(instance.getTag("param")).to.be(null);
        });
    });
    describe("#toString", function () {
        it("should return '@public\n'", function () {
            instance.setTag("public", "");
            expect(instance.toString()).to.be("@public\n");
        });
        it("should return 'Returns the comment as a string\n\n@public\n@return {js.String}\n'", function () {
            instance.setDescription("Returns the comment as a string");
            instance.setTag("public", "");
            instance.setTag("return", "{js.String}");
            expect(instance.toString()).to.be("Returns the comment as a string\n\n@public\n@return {js.String}\n");
        });
        it("should return 'Returns the comment as a string\n\n@return {js.String}\n@public\n'", function () {
            instance.setDescription("Returns the comment as a string");
            instance.setTag("return", "{js.String}");
            instance.setTag("public", "");
            expect(instance.toString()).to.be("Returns the comment as a string\n\n@return {js.String}\n@public\n");
        });
    });
    describe("#charAt", function () {
        it("should return 'u'", function () {
            instance.setTag("public", "");
            expect(instance.Super.charAt(1)).to.be("p"); // consider the '@'-sign before public
        });
    });
    describe("#toUpperCase", function () {
        it("should return '@PUBLIC\n'", function () {
            instance.setTag("public", "");
            expect(instance.Super.toUpperCase()).to.be("@PUBLIC\n");
        });
    });
});