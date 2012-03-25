"use strict"; // run code in ES5 strict mode

function A() {}
A.constructor.prototype.myStaticValue = "myStaticValue";

function B() {}

C.prototype = A.prototype;