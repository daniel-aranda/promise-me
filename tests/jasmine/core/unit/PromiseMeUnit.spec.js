const PromiseMe = require('../../../../core/util/PromiseMe');

describe("PromiseMe | Unit Tests",function () {

    let promiseMe;

    function myCallbackFunction(name, callback){
        name += '_worked';
        callback(name);
    }

    beforeEach(function () {
        //promiseMe = PromiseMe.factory();
    });

    it("should run a callback function as promise", async function () {

        let reply = {};
        await PromiseMe.please(myCallbackFunction, reply, 'daniel');

        expect(reply.arguments[0]).toBe('daniel_worked');

    });

});
