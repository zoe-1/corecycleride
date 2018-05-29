'use strict';

const buildFinalCallback = function (internals, callback) {

    const finalCB = function () {

        return {
            name: 'final',
            description: 'fuction provided by developer to retrieve final value',
            fn: callback // callback(err, result)
        };
    };

    return internals.series.push(finalCB());

};

const buildRequestObject = function (internals, request) {

    internals.request = {};
    internals.request.result = {};

    for (let i = 0; i < internals.series.length; ++i) {

        // console.log('iterate1' + internals.series[i].name);

        internals.request.result[internals.series[i].name] = {};
    };

    return;

};


const cycleNext = function (internals, request, seriesName, seriesOfFuncs, callbackEnd) {

    console.log('Initializing cycleNext');

    internals.name = seriesName;
    internals.series = seriesOfFuncs;
    internals.end = callbackEnd;
    internals.count = seriesOfFuncs.length;
    internals.index = 0;

    buildFinalCallback(internals, callbackEnd);

    buildRequestObject(internals, request);

    internals.next = function (result) {

        // check if result is Error or Boom

        const currentIndex = internals.index;
        ++internals.index;

        internals.request.result[internals.series[currentIndex].name] = result;

        if ( currentIndex < internals.count ) {

            return internals.series[currentIndex].fn(
                internals.result,
                internals.next
            );
        }

        return internals.series[currentIndex].fn(
            'errorStatus',
            internals.request.result
        );
    };

    this.start = function (value) {

        // check if value is Error or Boom

        console.log('cycleNext.start');

        // internals.request.result.start = value;

        // console.log(internals);

        internals.next(value);
    };

    return this;
};


const cycleHandler = {

    construct(target, args) {

        // validate

        console.log('cycleNext constructor called ' + args[0]);

        return new target(...args);
    }
};


const SozoCycleProxy = function (seriesName, seriesOfFuncs, callbackEnd) {

    console.log('ProxySetup seriesName ' + seriesName);

    const internals = {};

    const request = {};

    const CycleProxy = new Proxy(cycleNext, cycleHandler);

    // const Cycle = new CycleProxy(internals, seriesName, seriesOfFuncs, callbackEnd);

    const StartCycle = new CycleProxy(
        internals,
        request,
        seriesName,
        seriesOfFuncs,
        callbackEnd
    ).start;

    return StartCycle;
};

exports = module.exports = SozoCycleProxy;
