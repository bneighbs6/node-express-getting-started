
// require express package and assign to variable. 
const express = require("express");

// require morgan package and assign to variable
const morgan = require("morgan");

// Express package exports a function
// when function is invoked, you get a new Express application. 
// Assing that express app to a variable. 
const app = express();


// middleware function
// takes 3 arguments
// req = request. Information and methods related to the incoming request will be stored in this object.
// res = response. This object has information and methods related to sending back a response from the server.
// next = next. tells Express that this middleware function is complete. It will then go on to the next piece of middleware.

// updating sayHello() fx for "Query and Route Parameters" lesson
// log the query to console
// assign query.name to a variable
// assign tertiary operator to name variable
// send content to screen
const sayHello = (req, res, next) => {
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello ${name}!` : "Hello!";
    res.send(content)
}

// saySomething middleware fx
// uses params feature for a greeting 
// this can be used in a route parameter when using app.get()
const saySomething = (req, res, nex) => {
    const greeting = req.params.greeting;
    const name = req.query.name;
    const content = greeting && name ? `${greeting}, ${name}` : `${greeting}`;
    res.send(content);
}

app.get("/say/:greeting", saySomething)


// Replace logging function below
// morgan will log incoming requests like: "GET / 304 3.881 ms - - GET /favicon.ico 304 0.519 ms - -"
app.use(morgan("dev"));

/*
// nonresponsive middleware function
// next() function called to go to the next middleware function
const logging = (req, res, next) => {
    console.log("A request is being made!");
    next();
  };
*/


// logging needs to be put first due to the fact that sayHello does not have a next() fx inside it. 
// with no next() inside, the middleware will not go to the next middleware fx
// app.use(logging);
// Replacing app.use() with app.get() method
// app.use(sayHello);

// app.get() accepts 2 arguments
// 1. the ROUTE you want your Express function to run
// 2. Express function you want run on that ROUTE
// the server is only responding with the sayHello() middleware when you go to the /hello route. END OF "BUILDING ROUTES" LESSON
app.get("/hello", sayHello);


// export Express app to be used in other files
module.exports = app; 
