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

        const finalCallback = function (payload, err, result) {

            console.log('finalCallback');
        };

        const extensions = {
            db: {
                name: 'mockdb',
                conn: 'mockconnection'
            }
        };

        const Series = new Cycle('testCycle', internals.seriesOfFuncs, extensions, finalCallback);

        Series('start series');
    });
});

internals.seriesOfFuncs = [];
