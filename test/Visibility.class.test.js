"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    Visibility = require("../lib/Visibility.class");

describe("Visibility", function () {
    describe("#PUBLIC", function () {
        it("should return 'PUBLIC'", function () {
            expect(Visibility.PUBLIC).to.be("PUBLIC");
        });
        it("should return 'PROTECTED'", function () {
            expect(Visibility.PROTECTED).to.be("PROTECTED");
        });
        it("should return 'PRIVATE'", function () {
            expect(Visibility.PRIVATE).to.be("PRIVATE");
        });
    });
});