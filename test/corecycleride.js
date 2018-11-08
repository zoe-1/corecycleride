'use strict';

const Code = require('code');
const Lab = require('lab');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;

const internals = {};

const Cycle = require('../src/corecycleride');


describe.only('/core cycle ride', () => {

    it('cycle series rewrite', () => {

        const finalCallback = function (payload, err, payloads) {

            console.log('finalCallback payload: ' + payload);
            console.log('finalCallback err: ' + err);
            console.log('finalCallback payloads.one: ' + payloads.one);
            console.log('finalCallback payloads.two: ' + payloads.two);
            console.log('finalCallback payloads.three: ' + payloads.three);
        };

        const extensions = {
            db: {
                name: 'mockdb',
                conn: 'mockconnection'
            }
        };

        const Series = new Cycle('testCycle', internals.seriesOfFuncs, extensions, finalCallback);

        Series.start('start series');
    });

    it('On error exit cycle', () => {

        const finalCallback = function (payload, err, payloads) {

            console.log('finalCallback payload: ' + payload);
            console.log('finalCallback err: ' + JSON.stringify(err));
            console.log('finalCallback payloads.one: ' + JSON.stringify(payloads.one));
            console.log('finalCallback payloads.two: ' + JSON.stringify(payloads.two));
            console.log('finalCallback payloads.three: ' + JSON.stringify(payloads.three));
        };

        const extensions = {
            db: {
                name: 'mockdb',
                conn: 'mockconnection'
            }
        };

        const Series = new Cycle('testCycle', internals.seriesOfFuncsThrowError, extensions, finalCallback);

        Series.start('start series');
    });
});

internals.seriesOfFuncs = [
    {
        name: 'one',
        description: 'first function to call',
        fn: function (payload, request, next) {

            // request.data = {}
            // request.data.one = 'one data';

            console.log('one executing payload: ' + payload);
            return next('one completed');
        }
    },
    {
        name: 'two',
        description: 'second function to call',
        fn: function (payload, request, next) {

            // request.data.two = 'two data';

            console.log('two executing payload: ' + payload);
            // console.log('two PEAK request.ext.db.name: ' + request.ext.db.name);
            return next('two completed');
        }
    },
    {
        name: 'three',
        description: 'third function to call',
        fn: function (payload, request, next) {

            // request.data.three = 'two data';

            console.log('three executing payload: ' + payload);
            return next('three completed');
        }
    }
];

internals.seriesOfFuncsThrowError = [
    {
        name: 'one',
        description: 'first function to call',
        fn: function (payload, request, next) {

            // request.data = {}
            // request.data.one = 'one data';

            console.log('one executing payload: ' + payload);

            const error = {
                 'typeOf': 'CycleError',
                 'name': 'TestError',
                 'message': 'Sample Error Message'
            };

            return next(error);
        }
    },
    {
        name: 'two',
        description: 'second function to call',
        fn: function (payload, request, next) {

            // request.data.two = 'two data';

            console.log('two executing payload: ' + payload);
            // console.log('two PEAK request.ext.db.name: ' + request.ext.db.name);
            return next('two completed');
        }
    },
    {
        name: 'three',
        description: 'third function to call',
        fn: function (payload, request, next) {

            // request.data.three = 'two data';

            console.log('three executing payload: ' + payload);
            return next('three completed');
        }
    }
];
