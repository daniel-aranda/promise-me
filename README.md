# promise-me

Things in JavaScript have evolutionated a lot in the last years. The backwards compability from JavaScript is probably the best around all the languages, however something good typically came with something not that good.

One of the problems of old JavaScript are callbacks, and specially callback hells. Modern JavaScript looks like this:

```js

  async myClassMethod(){
  
    await this.someWork();
    
    await this.someOtherWork();

    await this.someOtherWork2();

    //congratulations, job completed!
  
  }

```

Former JavaScript would be:

```js

  myClassMethod(callback){
  
    someWork(function(){
    
      someOtherWork(function(){
      
        someOtherWork2(function(){
        
          //Your ugly job is completed!
          callback();
        
        });
      
      });
      
    });
  
  }

```

Having the context that modern JavaScript looks nice and because of backwards compabilities we see tons of code with callbacks, what if we make the callbacks nicer, that is why I created promise-me.

Usage, converting one of the most common callback functions, setTimeout:
```js
  
  //reply is a placeholder to capture arguments from your callback (if any)
  let reply = {};

  await PromiseMe.please(setTimeout, reply, 3000);
```

Comparing code waiting 3000 miliseconds:
```js

  //before waiting
  await PromiseMe.please(setTimeout, {}, 3000);
  //after waiting, I'm happy no more callback hells

```
```js

  //before waiting
  setTimeout(() => {
    
    //after waiting, I'm the first step of a callback hell
    
  },3000);

```

Usage on a custom callback function()
```js
  function myCallback(name, callback){
    callback(`The best magician: ` + name);
  }
```

Typical usage:
```js

  myCallback((newName) => {
    
     //Output: The best magician: Celi 
     console.log(newName);
    
  }, 'Celi');

```

Promised way:

```js

  let reply = {};

  await PromiseMe.please(myCallback, reply, `celi`);
  
   //Output: The best magician: Celi   
  console.log(reply.arguments[0]);

```

Installation:
```
npm install @promise-me-async
```


Running tests:
```
  npm test
```

Output from tests:


<img width="450" alt="image" src="https://user-images.githubusercontent.com/1669319/177839549-8ba77e3b-438c-4727-a9d1-d184bf348860.png">
