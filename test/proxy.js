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

        const Cycle = new SozoCycle('CycleName', 'DataStore');

        Cycle.next('Dispostion is Set');

        expect(Cycle).to.be.an.object();
    });
});

internals.requests = [
    {
        name: 'one',
        description: 'first function to call',
        fn: function (request, series) {

            // request.data = {}
            // request.data.one = 'one data';

            console.log('one executing');
            return series.next();
        }
    },
    {
        name: 'two',
        description: 'second function to call',
        fn: function (request, series) {

            // request.data.two = 'two data';

            console.log('two executing ');
            return series.next('two completed');
        }
    },
    {
        name: 'three',
        description: 'third function to call',
        fn: function (request, series) {

            // request.data.three = 'two data';

            console.log('three executing');
            return series.next('three completed');
        }
    }
];
