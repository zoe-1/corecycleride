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

    internals.callback = callback;

    const finalCB = function () {

        return {
            name: 'final',
            description: 'fuction provided by developer to return series final value',
            fn: callback // callback(payload, err, result)
        };
    };

    return internals.series.push(finalCB());
};

const buildRequestObject =  function (internals, extension, request) {

    request.cache = extension.requestCache
    request.ext = extension;
    request.endCallback = internals.callback;
    request.payloads= {};

    for (let i = 0; i < internals.series.length; ++i) {

        // console.log('iterate1' + internals.series[i].name);

        request.payloads[internals.series[i].name] = {};
    };

    return;
};

const cycleNext = function (internals, request, seriesName, seriesOfFuncs, extensions, callbackEnd) {

    internals.name = seriesName;
    internals.series = seriesOfFuncs;
    internals.count = seriesOfFuncs.length;
    internals.index = 0;
    internals.callback = function () {}; // set at buildFinalCallback 

    buildFinalCallback(internals, callbackEnd);

    buildRequestObject(internals, extensions, request, callbackEnd);

    const next = function (payload) {

        console.log('cycleNext.next ' + payload);
        console.log('extensions.db.name ' + extensions.db.name);

        let currentIndex = internals.index;
        let error = null;

        ++internals.index;

        // check if result is Error or Boom
        // if error skip to appropriate step in lifecycle

        if ((payload.typeOf) && (payload.typeOf === 'CycleError')) {
        
            // exit cycle error thrown

            currentIndex = internals.index = internals.count;
            error = payload;
        }

        request.payloads[internals.series[currentIndex].name] = payload;

        if ( currentIndex < internals.count ) {

            return internals.series[currentIndex].fn(
                payload,
                request,
                next
            );
        }

        return internals.series[currentIndex].fn(
            payload,
            error,
            request.payloads // cb(payload, err, result)
        );
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

    // Build validations for extensions.
    // Plan for this to be an optional parameter.

    const StartCycle = new cycleNext(
        internals,
        request,
        seriesName,
        seriesOfFuncs,
        extensions,
        callbackEnd
    );

    return StartCycle;
};

exports = module.exports = Cycle;
