"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    AbstractMethod = require("../lib/AbstractMethod.class"),
    AbstractProperty = require("../lib/AbstractProperty.class"),
    Class = require("../lib/Class.class"),
    Comment = require("../lib/Comment.class"),
    Interface = require("../lib/Interface.class"),
    Method = require("../lib/Method.class"),
    Package = require("../lib/Package.class"),
    Property = require("../lib/Property.class"),
    PropertyCollection = require("../lib/PropertyCollection.class"),
    Visibility = require("../lib/Visibility.class"),
    index = require("..");

describe("index", function () {
    it("should return true", function () {
        expect(index.AbstractMethod).to.be(AbstractMethod);
        expect(index.AbstractProperty).to.be(AbstractProperty);
        expect(index.Class).to.be(Class);
        expect(index.Comment).to.be(Comment);
        expect(index.Interface).to.be(Interface);
        expect(index.Method).to.be(Method);
        expect(index.Package).to.be(Package);
        expect(index.Property).to.be(Property);
        expect(index.PropertyCollection).to.be(PropertyCollection);
        expect(index.Visibility).to.be(Visibility);
    });
});