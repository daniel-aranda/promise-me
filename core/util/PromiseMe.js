const EventEmitter = require('events');

class PromiseMe extends EventEmitter{

    static factory()
    {
        return new PromiseMe();
    }

    constructor()
    {
        super();
    }

    static please(callbackFuntion, reply, ...args){

        return new Promise((resolve, reject) => {

            try{

                let pseudoCallback = function(){
                    reply.arguments = arguments;
                    resolve();
                };

                args.push(pseudoCallback);

                callbackFuntion.apply(null, args);


            }catch(error){

                reject(error);
                
            }

        });


    }

}

module.exports = PromiseMe;
