'use strict';


const internals = {};

function sum(a, b) {

    return a + b;
}

function monster1(disposition) {

    this.count = 0;
    this.disposition = disposition;

    this.next = function () {
    
        console.log('next');
        console.log(this.disposition);
    }
}

const handler1 = {

    construct(target, args) {

        // console.log('sum constructor called');
        console.log('monster1 constructor called');
        // expected output: "monster1 constructor called"

        return new target(...args);
    },
    apply: function(target, thisArg, argumentsList) {

        console.log("this: " + thisArg);
        console.log("this.count: " + this.count);
        ++this.count;
        console.log(`Calculate sum: ${argumentsList}`);

        // expected output: "Calculate sum: 1,2"

        return target(argumentsList[0], argumentsList[1]) * 10;
    }
};

const SozoCycle = function (seriesName, seriesOfFuncs) {

    console.log('CONSTRUCTING ' + seriesName);

    this._series = []; 

    // return new Proxy(sum, handler1);
    // return new Proxy(monster1, handler1);

    // Build requests with below logic 

    const Cycle = new Proxy(monster1, handler1);
    const test = new Cycle('testName');

    console.log('test.dispostion set: ' + test.disposition);
    // test.next();

    this._series.push(test); 

    // Starts series execution

    this.start = function () {
    
        console.log('SozoCycle.start ' + this._series[0].disposition);
        // this._series[0].next()
    }

    return this;
};

exports = module.exports = SozoCycle;

// console.log(new proxy1('fierce').disposition);
