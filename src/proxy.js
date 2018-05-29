'use strict';

const buildFinalCallback = function (internals, callback) {

    const finalCB = function () {
    
        return {
            name: 'finalCallback', 
            description: 'fuction provided by developer to retrieve final value',
            fn: callback // callback(err, result)
        }
    }

    return internals.series.push(finalCB());

};


const cycleNext = function (internals, seriesName, seriesOfFuncs, callbackEnd) {

    console.log('Initializing cycleNext');

    internals.name = seriesName;
    internals.series = seriesOfFuncs;
    internals.end = callbackEnd;
    internals.count = seriesOfFuncs.length;
    internals.index = 0;

    buildFinalCallback(internals, callbackEnd);

    internals.next = function (value) {

        // check if value is Error or Boom

        if (internals.index < internals.count) {
        
            ++internals.index;
        }

        if ( internals.index === internals.count ) {

            return internals.series[internals.index].fn('requestObject', 'RESULT_FINAL');
        }

        return internals.series[internals.index - 1].fn('requestObject', internals.next);
    };

    const testName = 'DynamicFunctionName';

    this.start = function (value) {

        // check if value is Error or Boom

        console.log('cycleNext.start');

        internals.name = value;

        console.log(internals);

        internals.next();
    };

    return this;
};


const cycleHandler = {

    construct(target, args) {

        // validations

        console.log('cycleNext constructor called ' + args[0]);

        return new target(...args);
    }
};


const SozoCycleProxy = function (seriesName, seriesOfFuncs, callbackEnd) {

    console.log('ProxySetup seriesName ' + seriesName);

    const internals = {};

    const CycleProxy = new Proxy(cycleNext, cycleHandler);

    const Cycle = new CycleProxy(internals, seriesName, seriesOfFuncs, callbackEnd);

    const test = new CycleProxy(internals, seriesName, seriesOfFuncs, callbackEnd).start;

    test.boom = 'test boom';

    return test;
    // return Cycle.start;
};

exports = module.exports = SozoCycleProxy;
