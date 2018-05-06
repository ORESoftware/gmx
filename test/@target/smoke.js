"use strict";
exports.__esModule = true;
var suman_1 = require("suman");
var Test = suman_1["default"].init(module, {
    ioc: {
        zoom: '1.6'
    }
});
Test.define('diggity dog')
    .source('foo', 'bar')
    .run(function (b) {
    var _a = b.getHooks(), describe = _a.describe, it = _a.it;
    var z = b.getInjections();
    var x = b.ioc;
    var m = b.testId;
    console.log('z =>', z);
    console.log('x =>', x);
    console.log('m =>', m);
    describe('inner', function (b) {
        var it = b.getHooks().it;
        it('passes', function (t) {
            t.assert(true);
        });
    });
    for (var i = 0; i < 10; i++) {
        describe.define('zoom')
            .run(function (b) {
            it('passes', function (t) {
                t.assert.equal(true, true);
            });
        });
    }
})
    .run(function (v) {
    var _a = v.getHooks(), describe = _a.describe, it = _a.it;
    describe('zoom', function (b) {
        it('is good', function (t) {
        });
    });
});
