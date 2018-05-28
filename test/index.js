'use strict';

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const internals = {};

const SozoCycle = require('../src');

describe('/index', () => {

    it('start up server', () => {

        const ProcessData = new SozoCycle('boom', internals.requests, (err, result) => {

            console.log('FINISHED ' + err + ' ' + result);
        });

        console.log(Object.keys(ProcessData));
        // const server = await University.init('test');

        expect(ProcessData).to.be.an.object();

        ProcessData.series.execute('testOne');
        // await server.stop({ timeout: 1 });



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
