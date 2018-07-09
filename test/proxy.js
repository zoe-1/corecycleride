'use strict';

const SozoCycle = require('../src/proxy');

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const internals = {};


describe.only('/proxy', () => {

    it('build sozo series from proxy', () => {

        const finalCB = function (payload, err, result) {

            console.log('FINISHED VALUES ' + err + ' ' + result + ' ' + payload);
            console.log(Object.keys(result));
            console.log('one ' + result.one);
            console.log('two ' + result.two);
            console.log('three ' + result.three);
            console.log('final ' + result.final);

        };

        const next = new SozoCycle('CycleName', internals.series, finalCB);

        const payload = 'starting payload';

        next(payload);

        // console.log('next keys ' + Object.keys(next));
        // console.log('next.name ' + next.name);
        // console.log('next.boom ' + next.boom);

        // expect(Cycle).to.be.an.object();
    });
});

internals.series = [
    {
        name: 'one',
        description: 'first function to call',
        fn: function (payload, request, next) {

            // request.result = {}
            // request.result.one = 'one received payload';

            console.log('one executing ' + payload);
            return next('one payload');
        }
    },
    {
        name: 'two',
        description: 'second function to call',
        fn: function (payload, request, next) {

            // request.data.two = 'two data';

            console.log('two executing ' + payload);
            return next('two payload');
        }
    },
    {
        name: 'three',
        description: 'third function to call',
        fn: function (payload, request, next) {

            // request.data.three = 'two data';

            console.log('three executing ' + payload);
            return next('three payload');
        }
    }
];
// Christian
