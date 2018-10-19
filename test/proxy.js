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
            // console.log(Object.keys(result));
            // console.log('  one** ' + result.one);
            // console.log('  two** ' + result.two);
            // console.log('three** ' + result.three);
            // console.log('final** ' + result.final);

            expect(result).to.be.an.object();

            expect(result.one).to.equal('payload original');
            expect(result.two).to.equal('payload one');
            expect(result.three).to.equal('payload two');
            expect(result.final).to.equal('payload three');

            expect(payload).to.equal(result.final); // payload three
        };

        const next = new SozoCycle('CycleName', internals.series, finalCB);

        const payload = 'payload original';

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

            // console.log('one executing ' + payload);
            return next('payload one');
        }
    },
    {
        name: 'two',
        description: 'second function to call',
        fn: function (payload, request, next) {

            // request.data.two = 'two data';

            // console.log('two executing ' + payload);
            return next('payload two');
        }
    },
    {
        name: 'three',
        description: 'third function to call',
        fn: function (payload, request, next) {

            // request.data.three = 'two data';

            // console.log('three executing ' + payload);
            return next('payload three');
        }
    }
];
// Christian
