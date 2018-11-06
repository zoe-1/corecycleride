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

## Module Rewrite

setExtensions
buildFinalCallback
decorateRequestObject
cycleNext
Cycle

exports = module.exports = Cycle;

## internals 
Internals is declared in the constructor versus
a global variable of the script. Avoids singleton issues. 

## Build callback (handles cycle result)

const finalCB = function (payload, err, result) {

};

## The Request Object

const request = {
    payloads: { eventName: 'payload received by event' },
    ext: {}
};

## Build Request Object

const buildRequestObject = function (internals, extensions, request) {

};

## Build Final Callback 

const buildFinalCallback = function (internals, finalCB) {

};

## seriesEventFunctions

const seriesEventFunction = function (payload, request, next) {

    // request.data = {}
    // request.data.one = 'one data';

    console.log('one executing' + payload);
    return next();
};

## seriesEventObject

const Event = {
    name: 'eventName',
    description: 'description of this function',
    fn: seriesEventFunction  
};

## (Example Usage) Build Cycle Object

internals.series = [ArrayOfSeriesEventObjects];

const Cycle = new SozoCycle('CycleName', internals.series, finalCB);

## (Example Usage) send payload to series cycle

const payload = 'payload original';

Cycle(payload);

## (Example Usage) Build Cycle Object with Extensions.

Extensions may be database connections passed in from
the calling program. etc.

const extensions = = {
    db: DB connection object
};

internals.series = [ArrayOfSeriesEventObjects];

const Cycle = new SozoCycle('CycleName', internals.series, extensions, finalCB);

