# Review Questions

## What is Node.js?
    A: Node.js is a platform used to execute JavaScript applications outside the browser.
    It gives us the ability to write server code with JavaScript

## What is Express?
    A: Express is a Web Application framework that sits on top of the raw http server module by Node.js

## Mention two parts of Express that you learned about this week.
    A: Middleware and Routing

## What is Middleware?
    A: Middleware is a framework that allows us to extend the features provided by express.js. For example we can use middleware in authentication and logging. If I wanted to check if the username was "pedro" I would create a custom middleware that checks if the value of the username is equal to pedro, if it is then move to the next step
## What is a Resource?
    A: a resource is everything that is accessible via a unique URL and the management is done via HTTP requests.

## What can the API return to help clients know if a request was successful?
    A: The API can return the 200 "OK" HTTP status code  

## How can we partition our application into sub-applications?
    A: We can create new folders and name them according to our routes. If we have products routes we can create a folder named productsRoute and move our code into the new folder
## What is express.json() and why do we need it?
    A: It's a built-in middleware function in Express that parses incoming requests with JSON payloads and is based on body-parser