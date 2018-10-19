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
//    Then, loads the SeriesObject as the last object 
//    in the series to be executed.
//
//
// decorateRequestObject 
//  * decorate request object to contain results for
//    each step in the cycle: `request.result.name`.
//    `name`: is defined by the developer in the series object.
//  * ext: needs ability to add extensions.
//         For example, a database connection could be added (datastore).
//         This could be done when the Cycle object is constructed.
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

const buildFinalCallback = function (internals, callback) {

};

const decorateRequestObject =  function (internals, request) {

};

const cycleNext = function (internals, request, seriesName, seriesOfFuncs, callbackEnd) {

};

const Cycle = function (seriesName, seriesOfFuncs, extensions, callbackEnd) {

    // Inspect arguments to construct object.
    // Some parameters are optional (extensions).

    // init internal cycle variables
    const extensions = null;
    const internals = {};
    const request = {};

    setExtensions(extensions, request, arguments);

};

exports = module.exports = Cycle;
