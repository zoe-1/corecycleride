# sozo-cycle


## Module Docs

SozoCycleProxy
cycleHandler
cycleNext
buildRequestObject
buildFinalCallback


buildFinalCallback = function (internals, callback)

buildRequestObject = function (internals, request)

cycleNext = function (internals, request, seriesName, seriesOfFuncs, callbackEnd)

cycleHandler = {}

SozoCycleProxy = function (seriesName, seriesOfFuncs, callbackEnd)

exports = module.exports = SozoCycleProxy;


## Build Cycle Object

const next = new SozoCycle('CycleName', internals.series, finalCB);

internals.series = [ArrayOfSeriesObjects];

SeriesObject (below):
{
    name: 'seriesObject',
    description: 'description function',
    fn: function (payload, request, next) {

        // request.result = {}
        // request.result.one = 'one received payload';

        console.log('one executing ' + payload);
        return next('first payload');
    }
},
