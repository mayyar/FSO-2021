# Exercises 4.1.-4.2.

In the exercises for this part we will be building a _blog list application_, that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, url, and amount of upvotes from users of the application.

## 4.1 Blog list, step1

Let's imagine a situation, where you receive an email that contains the following application body:

```js
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

Turn the application into a functioning _npm_ project. In order to keep your development productive, configure the application to be executed with _nodemon_. You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.

Verify that it is possible to add blogs to list with Postman or the VS Code REST client and that the application returns the added blogs at the correct endpoint.

## 4.2 Blog list, step2

Refactor the application into separate modules as shown earlier in this part of the course material.

❗ refactor your application in baby steps and verify that the application works after every change you make. If you try to take a "shortcut" by refactoring many things at once, then [Murphy's law](https://en.wikipedia.org/wiki/Murphy%27s_law) will kick in and it is almost certain that something will break in your application. The "shortcut" will end up taking more time than moving forward slowly and systematically.

One best practice is to commit your code every time it is in a stable state. This makes it easy to rollback to a situation where the application still works.

# Exercises 4.3.-4.4.

Let's create a collection of helper functions that are meant to assist dealing with the blog list. Create the functions into a file called _utils/list_helper.js_. Write your tests into an appropriately named test file under the _tests_ directory.

## 4.3: helper functions and unit tests, step1

First define a `dummy` function that receives an array of blog posts as a parameter and always returns the value 1. The contents of the _list_helper.js_ file at this point should be the following:

```js
const dummy = (blogs) => {
  // ...
}

module.exports = {
  dummy,
}
```

Verify that your test configuration works with the following test:

```js
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
```

## 4.4: helper functions and unit tests, step2

Define a new `totalLikes` function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.

Write appropriate tests for the function. It's recommended to put the tests inside of a describe block, so that the test report output gets grouped nicely:

![](https://fullstackopen.com/static/56229b0710f038d818828ad82ff10bfd/5a190/5.png)

# Exercises 4.8. 4.10.

NB: the material uses the [toContain](https://jestjs.io/docs/expect#tocontainitem) matcher in several places to verify that an array contains a specific element. It's worth noting that the method uses the === operator for comparing and matching elements, which means that it is often not well-suited for matching objects. In most cases, the appropriate method for verifying objects in arrays is the [toContainEqual](https://jestjs.io/docs/expect#tocontainequalitem) matcher. However, the model solutions don't check for objects in arrays with matchers, so using the method is not required for solving the exercises.

Warning: If you find yourself using async/await and then methods in the same code, it is almost guaranteed that you are doing something wrong. Use one or the other and don't mix the two.

## 4.8: Blog list tests, step1

Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

Notice that you will have to make similar changes to the code that were made in the material, like defining the test environment so that you can write tests that use their own separate database.

## 4.10: Blog list tests, step3

Write a test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.

Once the test is finished, refactor the operation to use async/await instead of promises.

# Exercises 4.13.-4.14.

## 4.13 Blog list expansions, step1

Implement functionality for deleting a single blog post resource.

Use the async/await syntax. Follow [RESTful](https://fullstackopen.com/en/part3/node_js_and_express#rest) conventions when defining the HTTP API.

Feel free to implement tests for the functionality if you want to. Otherwise verify that the functionality works with Postman or some other tool.

## 4.14 Blog list expansions, step2

Implement functionality for updating the information of an individual blog post.

Use async/await.

The application mostly needs to update the amount of likes for a blog post. You can implement this functionality the same way that we implemented updating notes in [part 3](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#other-operations).

Feel free to implement tests for the functionality if you want to. Otherwise verify that the functionality works with Postman or some other tool.

# Exercises 4.15. 4.17. - 4.19.

In the next exercises, basics of user management will be implemented for the Bloglist application. The safest way is to follow the story from part 4 chapter User administration to the chapter Token-based authentication. You can of course also use your creativity.

**One more warning:** If you notice you are mixing async/await and `then` calls, it is 99% certain you are doing something wrong. Use either or, never both.

## 4.15: bloglist expansion, step3

Implement a way to create new users by doing a HTTP POST-request to address api/users. Users have _username, password and name_.

Do not save passwords to the database as clear text, but use the bcrypt library like we did in part 4 chapter Creating new users.

Implement a way to see the details of all users by doing a suitable HTTP request.

List of users can for example, look as follows:

![](https://fullstackopen.com/static/b59bda1bd7e5987a5c805332d509e516/5a190/22.png)

## 4.17: bloglist expansion, step5

Expand blogs so that each blog contains information on the creator of the blog.

Modify adding new blogs so that when a new blog is created, any user from the database is designated as its creator (for example the one found first). Implement this according to part 4 chapter populate. Which user is designated as the creator does not matter just yet. The functionality is finished in exercise 4.19.

Modify listing all blogs so that the creator's user information is displayed with the blog:

![](https://fullstackopen.com/static/199682ad74f50747c90997a967856ffa/5a190/23e.png)

and listing all users also displays the blogs created by each user:

![](https://fullstackopen.com/static/ac9967c89785b33440e9b1b4e87c17e5/5a190/24e.png)

## 4.18: bloglist expansion, step6

Implement token-based authentication according to part 4 chapter Token authentication.

## 4.19: bloglist expansion, step7

Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog.
