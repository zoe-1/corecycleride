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

        const extension = {
            db: {
                name: 'mockdb',
                conn: 'mockconnection'
            }
        };

        const Series = new Cycle('testCycle', internals.seriesOfFuncs, extension, finalCallback);

        Series.start('start series');
    });

    it('On error exit cycle', () => {

        // I like NeoOrigins but it's plural. Singular works better I think.
        // Maybe call it NeoOrigins but have it generate a OriginHanger hmmm.
        //
        // Definitions:
        // * OriginHanger application
        // * requestCache
        // * extension
        // * execute('origin_function_name', payload)
        // * OriginFunctions
        // * OriginHangerPlugins
        // * register() 

        // Build new application that would be sofajs like. NeoOrigins || OriginHanger
        // Functions would be built to execute corecycleride series or not. 
        // These NeoOrigins OriginHanger functions would be written in plugins.
        // All OriginHanger functions would be loaded into OriginHanger.requestCache object.
        // Plus, an OriginHanger.extension object would be available to pass into originFunctions.
        // when executed. To extend the request object passed through all series being executed. 
        //
        // OriginHangerPlugins
        // Plugins are used to register OriginFunctions into the OriginHanger application
        // Signature: (originHanger, extension) {}
        //
        // OriginFunctions
        // Registered in OriginHangerPlugins
        //
        // OriginHanger.execute('origin_function_name', payload);
        // Above would execute a OriginHanger function and pass the payload to it.
        //
        // OriginHanger.register: register OriginFunctions into application.
        //
        // Tracks: The request object for every corecycleride series executed would be
        // provisioned with the OriginHanger.requestCache and OriginHanger.extension.
        // Hence, each series function would be given the option to switch 'tracks' / series and execute
        // a different series. The callback provided to the new series/track
        // being called would be either: 
        // 1) the next() in the current function.
        // 2) the request.endCallback() which is the final callback
        //    provided to the original function starting the series.
        //
        //

        // function could call this series
        // function (requestCache, extendScheme) { // would execute below logic }
        // * requestCache would be object containing all project corecycleride event series
        //   load request cache into extension. extension = 125
        // * extendScheme would be object containing extension pieces.

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
            },
            requestCache: {}  // requestCache Object of requests passed in from calling function. OriginHanger object.
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
            // console.log('two PEAK request.endCallback ' + typeof  request.endCallback);
            if (typeof request.endCallback !== 'function') {
            
                throw Error('request.endCallback not a function');
            };

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
