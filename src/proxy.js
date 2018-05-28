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

    this.next = function (args) {

        console.log('cycleNext.next');
        console.log(args);
        console.log(this);
    };

    this.start = function () {

        console.log('start');
        console.log(this.disposition);
    };

    return this;
};


const cycleHandler = {

    construct(target, args) {

        console.log('cycleNext constructor called ' + args[0]);

        return new target(...args);
    },

    defineProperty(target, key, descriptor) {

        internals.invariant(key, 'define');
        return true;
    },

    apply: function (target, thisArg, argumentsList) {

        console.log('APPLY_CALLED!!');
        // console.log(`CycleProxy argumentList: ${argumentsList}`);

        // expected output: "Calculate sum: 1,2"
        return target(argumentsList[0], argumentsList[1]);
    }
};


const SozoCycleProxy = function (seriesName, seriesOfFuncs, callbackEnd) {

    console.log('ProxySetup seriesName ' + seriesName);

    const CycleProxy = new Proxy(cycleNext, cycleHandler);
    // CycleProxy._test = 'fail';

    const next = new CycleProxy('nextValueSet');

    this._series = [];

    return next;
};

exports = module.exports = SozoCycleProxy;
