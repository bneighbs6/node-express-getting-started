// create port and set it = whatever is in process.env (set default to 8000)
const {PORT = 8000} = process.env;

// Require Express application (app) that was created in app.js
const app = require("./app");

// This function will run when the server successfully starts.
const listener = () => {
    console.log(`The server is live on Port ${PORT}`);
};

/* 
The listen() method on your Express application is what runs the server. It takes two arguments: 
a port number and a function. The PORT variable defines where your server is running, and the 
listener() function will get called as soon as the server has successfully started.
*/

// listen() method (app.listen()) is what runs the server
// It takes 2 arguments: a PORT number, and a function
// PORT defines where your server is running
// listener() function will get called as soon as server has successfully started
app.listen(PORT, listener);