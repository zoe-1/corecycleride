'use strict';

// setExtensions
//  * parameters
//    - extensions object
//    - request object
//      to load extensions to.
//    - arguments passed to Cycle constructor.
//  * inspect arguments passed to Cycle generator.
//    If extensions supplied by developer load them
//    into the request object: `request.ext`.
//
// buildFinalCallback
//  * builds the final callback object as a SeriesObject.
//    Then, loads the SeriesEventObject as the last event
//    in the series to be executed.
//
//
// buildRequestObject
//  * decorate request object to contain results for
//    each step in the cycle: `request.result.name`.
//    `name`: is defined by the developer in the series object.
//  * ext: needs ability to add extensions.
//         For example, a database connection could be added (datastore).
//         This could be done when the Cycle object is constructed.
//  * parameters
//      - internals
//      - extensions
//      - request
//  * request object
//      - payloads
//        request.payloads.function_names
//        request.payloads.one
//      - ext
//
//
// cycleNext
//  *
//
//
// Cycle
//  * constructor of the cycle of functions to be executed.
//  * parameters
//      - seriesName
//      - description
//      - seriesOfFuncs: Array of SeriesObject(s)
//      - extensions (optional): Object with ext values available at: request.ext.
//      - callbackEnd
//
//  * SeriesObject
//      built by developer must have keys:
//      - name
//      - description
//      - fn


const setExtensions = function (extensions, request, initArguments) {

};

const buildFinalCallback = function (internals, callback) {

};

const buildRequestObject =  function (internals, extensions, request) {

};

const cycleNext = function (internals, request, seriesName, seriesOfFuncs, extensions, callbackEnd) {

    // internals.name = seriesName;
    // internals.series = seriesOfFuncs;
    // internals.end = callbackEnd;
    internals.count = seriesOfFuncs.length;
    internals.index = 0;

    // buildFinalCallback(internals, callbackEnd);

    // buildRequestObject(internals, request);
    // decorateRequestObject(internals, request);

    const next = function (payload) {

        console.log('cycleNext.next ' + payload);
        console.log('extensions.db.name ' + extensions.db.name);
    };

    this.start = function (payload) {

        next(payload);
    };

    return this;
};

const Cycle = function (seriesName, seriesOfFuncs, extensions, callbackEnd) {

    // Inspect arguments to construct object.
    // Some parameters are optional (extensions).
    // init internal cycle variables

    const request = {};
    const internals = {};

    // setExtensions(extensions, request, arguments);

    // @question
    // do I want to just return a function.
    // If do not return object it limits ability to groups
    // series by name in something similar to sofajs.

    const StartCycle = new cycleNext(
        internals,
        request,
        seriesName,
        seriesOfFuncs,
        extensions,
        callbackEnd
    ).start;

    return StartCycle;
};

exports = module.exports = Cycle;
