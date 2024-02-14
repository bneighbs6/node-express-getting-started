
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

// commenting out and placing inside the app.get() method for organization
/*
const sayHello = (req, res, next) => {
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello ${name}!` : "Hello!";
    res.send(content)
}
*/

// saySomething middleware fx
// uses params feature for a greeting 
// this can be used in a route parameter when using app.get()

// commenting out and placing inside the app.get() method for organization
/*
const saySomething = (req, res, next) => {
    const greeting = req.params.greeting;
    const name = req.query.name;
    const content = greeting && name ? `${greeting}, ${name}` : `${greeting}`;
    res.send(content);
}
*/

// commenting out and placing inside the app.get() method for organization
/*
const sayGoodbye = (req, res, next) => {
    res.send("Sorry to see you go.")
}
*/

app.get("/say/hello", (req, res, next) => {
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello ${name}!` : "Hello!";
    res.send(content)
})

app.get("/say/goodbye", (req, res, next) => {
    res.send("Sorry to see you go.")
})
app.get("/say/:greeting", (req, res, next) => {
    const greeting = req.params.greeting;
    const name = req.query.name;
    const content = greeting && name ? `${greeting}, ${name}` : `${greeting}`;
    res.send(content);
})

// New route for state abbreviations
app.get("/states/:abbreviation", (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    if (abbreviation.length !== 2) {
        next(`State abbreviation is invalid `)
    } else {
        res.send(`${abbreviation} is a nice state and I'd like to visit.`)
    }
})

// Add a missing route handler
// This is missing a route as its first parameter which means
// this handler will be called whenever a route does not exist.
app.use((req, res, next) => {
    res.send(`The route ${req.path} does not exist.`) // req.path = any entered url after first "/"
})


// Error handler has a fourth argument
/* 
If you try to access this function normally, you may have a hard time. The error-handler middleware only gets called in one of two cases:

1. When there is a problem in the application itself (for example, if you made a mistake in your code).

2. When you specifically trigger it using the next() function in a previous middleware function.
*/
app.use((err, req, res, next) => {
    console.error(err);
    res.send(err);
})

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



// export Express app to be used in other files
module.exports = app; 
