# sozo-cycle

## Websters Dictionary

cycle definition:
* a course or series of events or operations that
  lead back to the starting point.
* one complete performance of a periodic process.

## Module Docs

buildFinalCallback
buildRequestObject
cycleNext
cycleHandler
SozoCycleProxy

buildFinalCallback = function (internals, callback)

buildRequestObject = function (internals, request)

cycleNext = function (internals, request, seriesName, seriesOfFuncs, callbackEnd)

cycleHandler = {}

SozoCycleProxy = function (seriesName, seriesOfFuncs, callbackEnd)

exports = module.exports = SozoCycleProxy;

## Module Rewrite

internals
setExtensions
buildFinalCallback
decorateRequestObject
cycleNext
Cycle

exports = module.exports = Cycle;

## Build callback (handles cycle result)

const finalCB = function (payload, err, result) {

};

## Build Cycle Object

const cycle = new SozoCycle('CycleName', internals.series, finalCB);

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

## send payload to series cycle

const payload = 'payload original';

cycle(payload);


## Build Cycle Object with Extensions.

Extensions my be database connections passed in from
the calling program.


const extensions = = {
    db: DB connection object
};


