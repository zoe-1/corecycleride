'use strict';


const internals = {};


internals.invariant = function (key, action) {

    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
};


const cycleNext = function (disposition) {

    this.count = 0;
    this.disposition = disposition;

    this.start = function () {

        console.log('start');
        console.log(this.disposition);
    };

    return this;
};


const cycleHandler = {

    construct(target, args) {

        console.log('cycleNext constructor called');

        return new target(...args);
    },

    defineProperty(target, key, descriptor) {

        internals.invariant(key, 'define');
        return true;
    }
};


const SozoCycleProxy = function (seriesName, seriesOfFuncs, callbackEnd) {


    console.log('ProxySetup seriesName ' + seriesName);

    const CycleProxy = new Proxy(cycleNext, cycleHandler);
    // CycleProxy._test = 'fail';

    const test = new CycleProxy('testName');

    this._series = [];

    return test;
};

exports = module.exports = SozoCycleProxy;
