# Part 3. Programming a server with NodeJS and Express

> Source: [Full Stack Open 2021 Part 3](https://fullstackopen.com/en/part3)

## **a. Node.js and Express**

As mentioned in part 1, browsers don't yet support the newest features of JavaScript, and that is why the code running in the browser must be transpiled with e.g. [babel](https://babeljs.io/). The situation with JavaScript running in the backend is different. The newest version of Node supports a large majority of the latest features of JavaScript, so we can use the latest features without having to transpile our code.

Our goal is to implement a backend that will work with the notes application from part 2. However, let's start with the basics by implementing a classic "hello world" application.

Let's navigate to an appropriate directory, and create a new template for our application with the npm init command. We will answer the questions presented by the utility, and the result will be an automatically generated *package.json* file at the root of the project that contains information about the project.

```json
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Matti Luukkainen",
  "license": "MIT"
}
```

The file defines, for instance that the entry point of the application is the *index.js* file.

Let's make a small change to the *scripts* object:

```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
}
```

Next, let's create the first version of our application by adding an *index.js* file to the root of the project with the following code:

```js
console.log('hello world')
```

We can run the program directly with Node from the command line:

```shell
$ node index.js
```

Or we can run it as an [npm script](https://docs.npmjs.com/cli/v8/using-npm/scripts):

```shell
$ npm start
```

The start npm script works because we defined it in the *package.json* file.

Even though the execution of the project works when it is started by calling `node index.js` from the command line, it's customary for npm projects to execute such tasks as npm scripts.

## Simple web server

Let's change the application into a web server by editing the *index.js* files as follow:

```js
const http = require('http')  

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

![](https://fullstackopen.com/static/8836d8c6a93e804f6cbc73ff4d89913b/5a190/1.png)

In fact, the server works the same way regardless of the latter part of the URL. Also the address http://localhost:3001/foo/bar will display the same content.

❗ if the port 3001 is already in use by some other application, then starting the server will result in the error message.

Let's take a closer look at the first line of the code:

```js
const http = require('http')
```

In the first row, the application imports Node's built-in [web server](https://nodejs.org/docs/latest-v8.x/api/http.html) module. This is practically what we have already been doing in our browser-side code, but with a slightly different syntax:

```js
import http from 'http'
```

These days, code that runs in the browser uses ES6 modules. Modules are defined with an export and taken into use with an import.

However, Node.js uses so-called [CommonJS](https://en.wikipedia.org/wiki/CommonJS) modules. The reason for this is that the Node ecosystem had a need for modules long before JavaScript supported them in the language specification. 

The primary purpose of the backend server in this course is to offer raw data in the JSON format to the frontend. For this reason, let's immediately change our server to return a hardcoded list of notes in the JSON format:

```js
import http from 'http'

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

![](https://fullstackopen.com/static/33c3c629d8c3719de79f177cd03d7a71/5a190/2e.png)

## Express

Implementing our server code directly with Node's built-in [http](https://nodejs.org/docs/latest-v8.x/api/http.html) web server is possible. However, it is cumbersome, especially once the application grows in size.

Many libraries have been developed to ease server side development with Node, by offering a more pleasing interface to work with the built-in http module. These libraries aim to provide a better abstraction for general use cases we usually require to build a backend server. By far the most popular library intended for this purpose is [express](http://expressjs.com/).

```shell
$ npm install express
```

The version 4.17.1. of express was installed in our project. What does the caret in front of the version number in package.json mean?

```json
"express": "^4.17.1"
```

The versioning model used in npm is called [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

The caret in the front of *^4.17.1* means that if and when the dependencies of a project are updated, the version of express that is installed will be at least *4.17.1*. However, the installed version of express can also be one that has a larger *patch* number (the last number), or a larger *minor* number (the middle number). The major version of the library indicated by the first *major* number must be the same.

We can update the dependencies of the project with the command:

```shell
$ npm update
```

## Web and express

```js
const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

ight at the beginning of our code we're importing `express`, which this time is a function that is used to create an express application stored in the `app` variable:

Next, we define two *routes* to the application. The first one defines an event handler that is used to handle HTTP GET requests made to the application's / root:

The event handler function accepts two parameters. The first [request](http://expressjs.com/en/4x/api.html#req) parameter contains all of the information of the HTTP request, and the second [response](http://expressjs.com/en/4x/api.html#res) parameter is used to define how the request is responded to.

![](https://fullstackopen.com/static/db016b053153eda01c97cbc69270f934/5a190/5.png)

The second route defines an event handler that handles HTTP GET requests made to the notes path of the application:

![](https://fullstackopen.com/static/9b8fcdda9dc4637141064a131e2cef84/5a190/6ea.png)

In the earlier version where we were only using Node, we had to transform the data into the JSON format with the JSON.stringify method:

```js
response.end(JSON.stringify(notes))
```

With express, this is no longer required, because this transformation happens automatically.

⭐ It's worth noting that JSON is a string, and not a JavaScript object like the value assigned to `notes`.

![](https://fullstackopen.com/static/ab5b5f7c5d8e4b01881bbd927f04ed43/5a190/5.png)

## nodemon

> [nodemon](https://github.com/remy/nodemon) will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

```shell
$ npm install --save-dev nodemon
```

By development dependencies, we are referring to tools that are needed only during the development of the application, e.g. for testing or automatically restarting the application, like *nodemon*.

We can start our application with nodemon like this:

```shell
$ node_modules/.bin/nodemon index.js
```

Changes to the application code now cause the server to restart automatically. It's worth noting that even though the backend server restarts automatically, the browser still has to be manually refreshed. This is because unlike when working in React, we don't have the [hot reload](https://gaearon.github.io/react-hot-loader/getstarted/) functionality needed to automatically reload the browser.

The command is long and quite unpleasant, so let's define a dedicated npm script for it in the package.json file:

```json
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```

We can now start the server in the development mode with the command:

```shell
$ npm run dev
```

Unlike with the *start* and *test* scripts, we also have to add *run* to the command.

## REST

We take a more [narrow view](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) by only concerning ourselves with how RESTful APIs are typically understood in web applications. The original definition of REST is in fact not even limited to web applications.

Let's assume that the root URL of our service is *www.example.com/api*.

If we define the resource type of note to be notes, then the address of a note resource with the identifier 10, has the unique address www.example.com/api/notes/10.

The URL for the entire collection of all note resources is www.example.com/api/notes.

In some places (see e.g. [Richardson, Ruby: RESTful Web Services](https://www.oreilly.com/library/view/restful-web-services/9780596529260/)) you will see our model for a straightforward [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) API, being referred to as an example of [resource oriented architecture](https://en.wikipedia.org/wiki/Resource-oriented_architecture) instead of REST. We will avoid getting stuck arguing semantics and instead return to working on our application.

## Fetching a single resource

Let's expand our application so that it offers a REST interface for operating on individual notes. First let's create a [route](http://expressjs.com/en/guide/routing.html) for fetching a single resource.

The unique address we will use for an individual note is of the form *notes/10*, where the number at the end refers to the note's unique id number.

We can define [parameters](http://expressjs.com/en/guide/routing.html#route-parameters) for routes in express by using the colon syntax:

```js
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```

Now `app.get('/api/notes/:id', ...)` will handle all HTTP GET requests that are of the form /api/notes/SOMETHING, where SOMETHING is an arbitrary string.

The id parameter in the route of a request, can be accessed through the request object.

When we test our application by going to http://localhost:3001/api/notes/1 in our browser, we notice that it does not appear to work, as the browser displays an empty page. 

⚠️ Adding `console.log` commands into our code is a time-proven trick:

```js
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  const note = notes.find(note => note.id === id)
  console.log(note)
  response.json(note)
})
```

![](https://fullstackopen.com/static/7333b6dcc5a6e252178ee0bc4ed16db6/5a190/8.png)

To further our investigation, we also add a console log inside the comparison function passed to the find method.

```js
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    return note.id === id
  })
  console.log(note)
  response.json(note)
})
```

```
1 'number' '1' 'string' false
2 'number' '1' 'string' false
3 'number' '1' 'string' false
```

Let's fix the issue by changing the id parameter from a string into a [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number):

```js
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```

However, there's another problem with our application.

If we search for a note with an id that does not exist, the server responds with:

![](https://fullstackopen.com/static/71dba69685a59c3d5249303257863366/5a190/10ea.png)

The reason for this behavior is that the `note` variable is set to `undefined` if no matching note is found. The situation needs to be handled on the server in a better way. If no note is found, the server should respond with the status code [404 not found](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) instead of 200.

```js
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```

## Deleting resources

Next let's implement a route for deleting resources. Deletion happens by making an HTTP DELETE request to the url of the resource:

```js
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

If deleting the resource is successful, meaning that the note exists and it is removed, we respond to the request with the status code [204 no content](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.5) and return no data with the response.

## [Postman](https://fullstackopen.com/en/part3/node_js_and_express#postman)

Many tools exist for making the testing of backends easier. One of these is a command line program [curl](https://curl.se/). However, instead of curl, we will take a look at using [Postman](https://www.postman.com/) for testing the application.

## [The Visual Studio Code REST client](https://fullstackopen.com/en/part3/node_js_and_express#the-visual-studio-code-rest-client)

If you use Visual Studio Code, you can use the VS Code [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin instead of Postman.

## [The WebStorm HTTP Client](https://fullstackopen.com/en/part3/node_js_and_express#the-visual-studio-code-rest-client)

## Receiving data

Next, let's make it possible to add new notes to the server. Adding a note happens by making an HTTP POST request to the address http://localhost:3001/api/notes, and by sending all the information for the new note in the request body in the JSON format.

In order to access the data easily, we need the help of the express [json-parser](https://expressjs.com/en/api.html) that is taken to use with command `app.use(express.json())`.

```js
const express = require('express')
const app = express()

app.use(express.json())

//...

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})
```

The event handler function can access the data from the body property of the `request` object.

Without the json-parser, the *body* property would be undefined. The json-parser functions so that it takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the *body* property of the `request` object before the route handler is called.

For the time being, the application does not do anything with the received data besides printing it to the console and sending it back in the response.

Let's return to the application. Once we know that the application receives data correctly, it's time to finalize the handling of the request:

```js
app.post('/api/notes', (request, response) => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0

  const note = request.body
  note.id = maxId + 1

  notes = notes.concat(note)

  response.json(note)
})
```

The current version still has the problem that the HTTP POST request can be used to add objects with arbitrary properties. Let's improve the application by defining that the *content* property may not be empty. The *important* and *date* properties will be given default values. All other properties are discarded:

```js
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
```

If the received data is missing a value for the content property, the server will respond to the request with the status code [400 bad request](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1).

ℹ️ Notice that calling return is crucial, because otherwise the code will execute to the very end and the malformed note gets saved to the application.

If the content property has a value, the note will be based on the received data. As mentioned previously, it is better to generate timestamps on the server than in the browser, since we can't trust that host machine running the browser has its clock set correctly. ⭐ The generation of the date property is now done by the server.


```js
Math.max(...notes.map(n => n.id))
```

`notes.map(n => n.id)` creates a new array that contains all the ids of the notes. Math.max returns the maximum value of the numbers that are passed to it. However, `notes.map(n => n.id)` is an array so it can't directly be given as a parameter to Math.max. ⭐ The array can be transformed into individual numbers by using the "three dot" [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax `...`.

## About HTTP request types

[The HTTP standard](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) talks about two properties related to request types, safety and idempotence.

The HTTP GET request should be safe:

> In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe".

Safety means that the executing request must not cause any *side effects* in the server. By side-effects we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.

All HTTP requests except POST should be idempotent:

> Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property

POST is the only HTTP request type that is neither safe nor idempotent. If we send 5 different HTTP POST requests to /api/notes with a body of {content: "many same", important: true}, the resulting 5 notes on the server will all have the same content.

## Middleware

Middleware are functions that can be used for handling `request` and `response` objects.

The json-parser we used earlier takes the raw data from the `requests` that's stored in the request object, parses it into a JavaScript object and assigns it to the `request` object as a new property *body*.

Middleware is a function that receives three parameters:

```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

Middleware are taken into use like this:

```js
app.use(requestLogger)
```

Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called.There are also situations where we want to define middleware functions after routes. In practice, this means that we are defining middleware functions that are only called if no route handles the HTTP request.

```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```


## **b. Deploying app to internet**

Next let's connect the frontend we made in part 2 to our own backend.

In the previous part, the frontend could ask for the list of notes from the json-server we had as a backend, from the address http://localhost:3001/notes. Our backend has a slightly different url structure now, as the notes can be found at http://localhost:3001/api/notes. Let's change the attribute baseUrl in the *src/services/notes.js*.

We will also need to change the url specified in the effect in App.js:

```js
useEffect(() => {
    axios
      .get('http://localhost:3001/api/notes')
      .then(res => {
        setNotes(res.data)
      })
  }, [])
```

Now frontend's GET request to http://localhost:3001/api/notes does not work for some reason:

![](https://fullstackopen.com/static/da88e17cb078c89a6e7ba30d61fab0e6/5a190/3ae.png)

## Same origin policy and CORS

The issue lies with a thing called CORS, or Cross-Origin Resource Sharing.

> Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.

In our context the problem is that, by default, the JavaScript code of an application that runs in a browser can only communicate with a server in the same [origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). Because our server is in localhost port 3001, and our frontend in localhost port 3000, they do not have the same origin.

We can allow requests from other origins by using Node's [cors](https://github.com/expressjs/cors) middleware.

In your backend repository, install cors with the command

```shell
$ npm install cors
```
take the middleware to use and allow for requests from all origins:
```js
const cors = require('cors')

app.use(cors())
```

And the frontend works! However, the functionality for changing the importance of notes has not yet been implemented to the backend.

You can read more about CORS from [Mozillas page](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

![](https://fullstackopen.com/static/6b5dfae8a726cba417c2f2ed4170d9af/664c8/100.png)

The react app that runs in browser fetches now the data from node/express-server that runs in localhost:3001.

## Application to the Internet

Now that the whole stack is ready, let's move our application to the internet. We'll use good old [Heroku](https://www.heroku.com/) for this.

See this document: [Heroku documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

Add a file called *Procfile* to the backend project's root to tell Heroku how to start the application.

Change the definition of the port our application uses at the bottom of the *index.js* file like so:

```js
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

Now we are using the port defined in [environment variable](https://en.wikipedia.org/wiki/Environment_variable) `PORT` or port 3001 if the environment variable `PORT` is undefined. Heroku configures application port based on the environment variable.

Create a Git repository in the project directory, and add *.gitignore* with the following contents


```git
node_modules
```

Create a Heroku application with the command *heroku create*, commit your code to the repository and move it to Heroku with command *git push heroku main*.

![](https://fullstackopen.com/static/7e52f36bb453e8d8a730d4b2812764c1/5a190/25ea.png)

The frontend also works with the backend on Heroku. You can check this by changing the backend's address on the frontend to be the backend's address in Heroku instead of http://localhost:3001.

## Frontend production build

So far we have been running React code in development mode. In development mode the application is configured to give clear error messages, immediately render code changes to the browser, and so on.

When the application is deployed, we must create a [production build](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build) or a version of the application which is optimized for production.

A production build of applications created with create-react-app can be created with command [npm run build](https://github.com/facebook/create-react-app#npm-run-build-or-yarn-build).

## Serving static files from the backend

One option for deploying the frontend is to copy the production build (the build directory) to the root of the backend repository and configure the backend to show the frontend's main page (the file build/index.html) as its main page.

![](https://fullstackopen.com/static/3c4c5437683d0ea2e206c80b39766136/5a190/27ea.png)

To make express show static content, the page index.html and the JavaScript, etc., it fetches, we need a built-in middleware from express called [static](http://expressjs.com/en/starter/static-files.html).

When we add the following amidst the declarations of middlewares

```javascript
app.use(express.static('build'))
```

Because of our situation, both the frontend and the backend are at the same address, we can declare baseUrl as a [relative](https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2) URL. This means we can leave out the part declaring the server.

```js
import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// ...
```

After the change, we have to create a new production build and copy it to the root of the backend repository.

The application can now be used from the backend address http://localhost:3001:

![](https://fullstackopen.com/static/f5d8aad803a0a13ea9b29fd705774ec8/5a190/28e.png)

Our application now works exactly like the single-page app example application we studied in part 0.

When we use a browser to go to the address http://localhost:3001, the server returns the index.html file from the build repository. Summarized contents of the file are as follows:

```js
<head>
  <meta charset="utf-8"/>
  <title>React App</title>
  <link href="/static/css/main.f9a47af2.chunk.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script src="/static/js/1.578f4ea1.chunk.js"></script>
  <script src="/static/js/main.104ca08d.chunk.js"></script>
</body>
</html>
```

The file contains instructions to fetch a CSS stylesheet defining the styles of the application, and two *script* tags which instruct the browser to fetch the JavaScript code of the application - the actual React application.

The React code fetches notes from the server address http://localhost:3001/api/notes and renders them to the screen. The communications between the server and the browser can be seen in the *Network* tab of the developer console:

![](https://fullstackopen.com/static/6f63795c7abedc6d9afbc405f0642aeb/5a190/29ea.png)

The setup that is ready for product deployment looks as follows:

![](https://fullstackopen.com/static/6f33425b60b49278d57df7e62f81a32c/db910/101.png)

Unlike when running the app in a development environment, everything is now in the same node/express-backend that runs in localhost:3001. When the browser goes to the page, the file index.html is rendered. That causes the browser to fetch the product version of the React app. Once it starts to run, it fetches the json-data from the address localhost:3001/api/notes.

## The whole app to internet

After ensuring that the production version of the application works locally, commit the production build of the frontend to the backend repository, and push the code to Heroku again.

Our application saves the notes to a variable. If the application crashes or is restarted, all of the data will disappear.

The application needs a database. Before we introduce one, let's go through a few things.

The setup looks like now as follows:

![](https://fullstackopen.com/static/26dbec11959a8d1418e81b31e11624d0/5a190/102.png)


## Streamlining deploying of the frontend

To create a new production build of the frontend without extra manual work, let's add some npm-scripts to the package.json of the backend repository:

```json
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../part2-notes/ && npm run build && cp -r build ../notes-backend",
    "deploy": "git push heroku main",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}
```
The script `npm run build:ui` builds the frontend and copies the production version under the backend repository. `npm run deploy` releases the current backend to heroku.

`npm run deploy:full` combines these two and contains the necessary git commands to update the backend repository.

There is also a script `npm run logs:prod` to show the heroku logs.

⚠️ Note that the directory paths in the script *build:ui* depend on the location of repositories in the file system.

## Proxy

Changes on the frontend have caused it to no longer work in development mode (when started with command `npm start`), as the connection to the backend does not work.

![](https://fullstackopen.com/static/19026b5379d1feef11ecc20ca2f669a9/5a190/32ea.png)

This is due to changing the backend address to a relative URL:

```js
const baseUrl = '/api/notes'
```

If the project was created with create-react-app, this problem is easy to solve. It is enough to add the following declaration to the package.json file of the frontend repository.

```json
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
```

After a restart, the React development environment will work as a [proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/). If the React code does an HTTP request to a server address at http://localhost:3000 not managed by the React application itself (i.e. when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at http://localhost:3001.

Now the frontend is also fine, working with the server both in development- and production mode.

A negative aspect of our approach is how complicated it is to deploy the frontend. Deploying a new version requires generating new production build of the frontend and copying it to the backend repository. This makes creating an automated deployment pipeline more difficult. Deployment pipeline means an automated and controlled way to move the code from the computer of the developer through different tests and quality checks to the production environment.

## **c. Saving data to MongoDB**

## [Debugging Node applications](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#debugging-node-applications)

## [MongoDB](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db)

In this course we will use [MongoDB](https://www.mongodb.com/) which is a so-called [document database](https://en.wikipedia.org/wiki/Document-oriented_database).

Document databases differ from relational databases in how they organize data as well as the query languages they support. Document databases are usually categorized under the NoSQL umbrella term.

Read now the chapters on [collections](https://docs.mongodb.com/manual/core/databases-and-collections/) and [documents](https://docs.mongodb.com/manual/core/document/) from the MongoDB manual to get a basic idea on how a document database stores data.

Our preferred MongoDB provider in this course will be [MongoDB Atlas](https://www.mongodb.com/atlas/database).

## Schema

## Creating and saving objects

```js
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

## Fetching objects from the database

```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```

The objects are retrieved from the database with the [find](https://mongoosejs.com/docs/api.html#model_Model.find) method of the `Note` model. The parameter of the method is an object expressing search conditions. Since the parameter is an empty object `{}`, we get all of the notes stored in the `notes` collection.

We could restrict our search to only include important notes like this:

```js
Note.find({ important: true }).then(result => {
  // ...
})
```

## Backend connected to a database

Let's get a quick start by copy pasting the Mongoose definitions to the index.js file:

```js
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  'mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
```

Let's change the handler for fetching all notes to the following form:

```js
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
```

![](https://fullstackopen.com/static/321bffdcfa60d9fef6fefe5578eb4791/5a190/44ea.png)

One way to format the objects returned by Mongoose is to modify the toJSON method of the schema, which is used on all instances of the models produced with that schema. Modifying the method works like this:

```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

## Database configuration into its own module

Let's create a new directory for the module called models, and add a file called *note.js*:

```js
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
```

The public interface of the module is defined by setting a value to the module.exports variable. We will set the value to be the Note model. The other things defined inside of the module, like the variables mongoose and url will not be accessible or visible to users of the module.

It's not a good idea to hardcode the address of the database into the code, so instead the address of the database is passed to the application via the `MONGODB_URI` environment variable.

There are many ways to define the value of an environment variable. One way would be to define it when the application is started:

```shell
$ MONGODB_URI=address_here npm run dev
```

A more sophisticated way is to use the [dotenv](https://github.com/motdotla/dotenv#readme) library. You can install the library with the command:

```shell
$ npm install dotenv
```

To use the library, we create a .env file at the root of the project. The environment variables are defined inside of the file, and it can look like this:

```env
MONGODB_URI='mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'
PORT=3001
```

We also added the hardcoded port of the server into the `PORT` environment variable.

The *.env* file should be gitignored right away, since we do not want to publish any confidential information publicly online!

![](https://fullstackopen.com/static/e12482f21c1bd50aaa9fa2e9a85169f1/5a190/45ae.png)

The environment variables defined in the .env file can be taken into use with the expression `require('dotenv').config()` and you can reference them in your code just like you would reference normal environment variables, with the familiar `process.env.MONGODB_URI` syntax.

Let's change the *index.js* file in the following way:

```js
require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

// ..

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

⚠️ It's important that *dotenv* gets imported before the note model is imported. This ensures that the environment variables from the *.env* file are available globally before the code from the other modules is imported.

## Using database in route handlers

```js
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})
```

The note objects are created with the `Note` constructor function. The response is sent inside of the callback function for the `save` operation. This ensures that the response is sent only if the operation succeeded.

Using Mongoose's [findById](https://mongoosejs.com/docs/api.html#model_Model.findById) method, fetching an individual note gets changed into the following:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})
```

## [Verifying frontend and backend integration](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#verifying-frontend-and-backend-integration)



## Error handling

Let's change this behavior so that if note with the given id doesn't exist, the server will respond to the request with the HTTP status code 404 not found. In addition let's implement a simple `catch` block to handle cases where the promise returned by the `findById` method is *rejected*:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})
```

If no matching object is found in the database, the value of `note` will be `null` and the `else` block is executed. This results in a response with the status code *404 not found*. If promise returned by the `findById` method is rejected, the response will have the status code *500 internal server error*.

Let's make some small adjustments to the response in the `catch` block:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})
```

If the format of the id is incorrect, then we will end up in the error handler defined in the `catch` block. The appropriate status code for the situation is [400 Bad Request](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1), because the situation fits the description perfectly:

> The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.

⭐ Every time you're working on a project with a backend, *it is critical to keep an eye on the console output of the backend.*

## Moving error handling into middleware

We have written the code for the error handler among the rest of our code. This can be a reasonable solution at times, but there are cases where it is better to implement all error handling in a single place. This can be particularly useful if we later on want to report data related to errors to an external error tracking system like [Sentry](https://sentry.io/welcome/).

Let's change the handler for the /api/notes/:id route, so that it passes the error forward with the `next` function. The next function is passed to the handler as the third parameter:

```js
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
```

The error that is passed forwards is given to the `next` function as a parameter. If `next` was called without a parameter, then the execution would simply move onto the next route or middleware. If the `next` function is called with a parameter, then the execution will continue to the *error handler middleware*.

Express [error handlers](https://expressjs.com/en/guide/error-handling.html) are middleware that are defined with a function that accepts four parameters. Our error handler looks like this:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
```

In all other error situations, the middleware passes the error forward to the default Express error handler.

⭐ Note that the error handling middleware has to be the last loaded middleware!

## ❗The order of middleware loading

```js
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.post('/api/notes', (request, response) => {
  const body = request.body
  // ...
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // ...
}

// handler of requests with result to errors
app.use(errorHandler)
```
## Other operations

Let's add some missing functionality to our application, including deleting and updating an individual note.

The easiest way to delete a note from the database is with the [findByIdAndRemove](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove) method:

```js
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
```

The toggling of the importance of a note can be easily accomplished with the [findByIdAndUpdate](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate) method.

```js
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
```

Notice that the `findByIdAndUpdate` method receives a regular JavaScript object as its parameter, and not a new note object created with the `Note` constructor function.

There is one important detail regarding the use of the `findByIdAndUpdate` method. By default, the `updatedNote` parameter of the event handler receives the original document [without the modifications](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate). We added the optional `{ new: true }` parameter, which will cause our event handler to be called with the new modified document instead of the original.


## d. Validation and ESLint

One smarter way of validating the format of the data before it is stored in the database, is to use the [validation](https://mongoosejs.com/docs/validation.html) functionality available in Mongoose.

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  important: Boolean
})
```

The *minLength* and *required* validators are [built-in](https://mongoosejs.com/docs/validation.html#built-in-validators) and provided by Mongoose. The Mongoose [custom validator](https://mongoosejs.com/docs/validation.html#custom-validators) functionality allows us to create new validators, if none of the built-in ones cover our needs.

## Promise chaining

Many of the route handlers changed the response data into the right format by implicitly calling the `toJSON` method from `response.json`. For the sake of an example, we can also perform this operation explicitly by calling the `toJSON` method on the object passed as a parameter to `then`

We can accomplish the same functionality in a much cleaner way with [promise chaining](https://javascript.info/promise-chaining):

```js
app.post('/api/notes', (request, response, next) => {
  // ...

  note
    .save()
    .then(savedNote => {
      return savedNote.toJSON()
    })
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    }) 
    .catch(error => next(error)) 
})
```

## Deploying the database backend to production

The environment variables defined in dotenv will only be used when the backend is not in production mode, i.e. Heroku.

We defined the environment variables for development in file .env, but the environment variable that defines the database URL in production should be set to Heroku with the `heroku config:set` command.

```shell
$ heroku config:set MONGODB_URI=mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true
```

❗ if the command causes an error, give the value of MONGODB_URI in apostrophes:


```shell
$ heroku config:set MONGODB_URI='mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true'
```

The application should now work. Sometimes things don't go according to plan. If there are problems, *heroku logs* will be there to help.


## Lint

> Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.

In the JavaScript universe, the current leading tool for static analysis aka. "linting" is [ESlint](https://eslint.org/).

Let's install ESlint as a development dependency to the backend project with the command:

```shell
$ npm install eslint --save-dev
```

After this we can initialize a default ESlint configuration with the command:

```shell
$ npx eslint --init
```

![](https://fullstackopen.com/static/ba1423527692484103dcb2b7374eeb01/5a190/52be.png)

The configuration will be saved in the `.eslintrc.js` file

Inspecting and validating a file like `index.js` can be done with the following command:

```shell
$ npx eslint index.js
```

It is recommended to create a separate `npm script` for linting:

```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    // ...
    "lint": "eslint ."
  },
  // ...
}
```

Now the `npm run lint` command will check every file in the project.

Also the files in the `build` directory get checked when the command is run. We do not want this to happen, and we can accomplish this by creating an [.eslintignore](https://eslint.org/docs/user-guide/configuring/#ignoring-files-and-directories) file in the project's root with the following contents:

This causes the entire `build` directory to not be checked by ESlint.

➡️ A better alternative to executing the linter from the command line is to configure a *eslint-plugin* to the editor, that runs the linter continuously. By using the plugin you will see errors in your code immediately. You can find more information about the Visual Studio ESLint plugin [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

![](https://fullstackopen.com/static/64cf2fbae36000083aa1e48292aed8f2/5a190/54a.png)

ESlint has a vast array of [rules](https://eslint.org/docs/rules/) that are easy to take into use by editing the *.eslintrc.js* file.

Let's add the [eqeqeq](https://eslint.org/docs/rules/eqeqeq) rule that warns us, if equality is checked with anything but the triple equals operator. The rule is added under the rules field in the configuration file.

```js
{
  // ...
  'rules': {
    // ...
   'eqeqeq': 'error',
  },
}
```

Many companies define coding standards that are enforced throughout the organization through the ESlint configuration file. It is not recommended to keep reinventing the wheel over and over again, and it can be a good idea to adopt a ready-made configuration from someone else's project into yours. Recently many projects have adopted the Airbnb [Javascript style guide](https://github.com/airbnb/javascript) by taking Airbnb's [ESlint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) configuration into use.