'use strict';


const internals = {};

const R = class {

    constructor(name, description, count, index, fn, series) {

        this.name = name;
        this.description = description;
        this.count = count;
        this.index = index;
        this.fn = fn;
        this.series = series;

        return this;
    }

    error(errorMessage) {

        console.log('ERROR: ' + this.name);
        console.log('ERROR: ' + this.description);
        console.log('ERROR: ' + errorMessage);
    }

    next(request, next){

        if ( (this.index + 1) <= (this.count) ) {

            return this.fn('requestObject', this.series[(this.index + 1)]);
        }

        console.log('#############');
        return this.fn(null, 'RESULT_VALUE');
    }

    execute(request, next){

        if ( (this.index + 1) < (this.count) ) {

            return this.fn('requestObject', this.series[(this.index + 1)]);
        }

        return this.fn('requestObject', this.end(null, request));
    }
};


exports = module.exports = internals.Cycle = function (seriesName, arrayOfFuncs, callback) {

    this._series = [];
    this._seriesEnd = callback;
    this._seriesLength = arrayOfFuncs.length;

    for (let i = 0; i < this._seriesLength; ++i) {

        const request = new R(
            arrayOfFuncs[i].name,
            arrayOfFuncs[i].description,
            arrayOfFuncs.length,
            i,
            arrayOfFuncs[i].fn,
            this._series
        );

        this._series.push(request);
    };

    this.series =  this._series[0];

    // Place end on cycle array

    const end = new R(
        'end',
        'callback created by developer',
        arrayOfFuncs.length,
        arrayOfFuncs.length, // End index is length of array.
        callback,
        this._series
    );

    this._series.push(end);



    // for (let i = 0; i < this._seriesLength; ++i) {

    //     const R = function () {};

    //     R.prototype.func = function () {

    //         return series[this.count + 1](request, series[this.count + 2]);
    //     };
    // };

    // for (let i = 0; i < this._seriesLength; ++i) {

    //     // this._series[i] = arrayOfFuncs[i];

    //     console.log('boom: ' + arrayOfFuncs[i]);
    //     console.log('boom.name: ' + arrayOfFuncs[i].name);
    //     console.log('boom.count: ' + i);

    //     // const R = function () {};

    //     // R.prototype.func = function () {

    //     //     this.name = arrayOfFuncs[i].name;
    //     //     this.count = i;

    //     //     this.error = function (errorMessage) {

    //     //         // next.error(errorMessage);

    //     //         console.log('Error execute last function. ' + errorMessage);
    //     //     };

    //     //     const params = [];

    //     //     for (let j = 0; j < arguments.length; ++j) {

    //     //         params.push(arguments[j]);
    //     //     }

    //     //     console.log('EXEC ' + this.name);
    //     //     console.log('EXEC ' + this.count);
    //     //     console.log('EXEC ' + arrayOfFuncs.length);

    //     //     if ( (this.count + 1) !== arrayOfFuncs.length ) {

    //     //         console.log('**** ' + arrayOfFuncs.length);

    //     //         // return series[this.count + 1](request, series[this.count + 2]);
    //     //         return arrayOfFuncs[i].fn(request, series[this.count + 2]);
    //     //     }

    //     //     return callback(null, 'YES DONE');
    //     //     // this._series[this.count + 1];
    //     // };

    //     // this._series[i] = new R().func;
    // }

    // this[seriesName] = this._series[0].fn;

    return this;
};
