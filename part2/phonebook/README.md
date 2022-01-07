## Exercises 2.6.-2.11. / Exercises 2.15.-2.18. / Exercises 2.19.-2.20.


### 2.6: The Phonebook Step1

Let's create a simple phonebook. *In this part we will only be adding names to the phonebook.*

You can use the code below as a starting point for the App component of your application:

```javascript
import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
```

The `newName` state is meant for controlling the form input element.

![2.6](https://fullstackopen.com/static/501199c4a6d7a5702a7bdf31998d5a1d/5a190/10e.png)

**NB:**

* you can use the person's name as value of the key property
* remember to prevent the default action of submitting HTML forms!

### 2.7: The Phonebook Step2

Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable methods for accomplishing this task. Keep in mind how object equality works in Javascript.

Issue a warning with the alert command when such an action is attempted:

![2.7](https://fullstackopen.com/static/d5be58590c1460090cb1c87adf201886/5a190/11e.png)

Hint: when you are forming strings that contain values from variables, it is recommended to use a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

```javascript
`${newName} is already added to phonebook`
```

### 2.8: The Phonebook Step3

Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second input element to the form (along with its own event handler):

```javascript
<form>
  <div>name: <input /></div>
  <div>number: <input /></div>
  <div><button type="submit">add</button></div>
</form>
```

![2.8](https://fullstackopen.com/static/3068a34af61692773a06d60ee93638a9/5a190/12e.png)

### 2.9*: The Phonebook Step4

Implement a search field that can be used to filter the list of people by name:

![2.9](https://fullstackopen.com/static/4b5897029d4c9e2eb61631ca4c1a4f24/5a190/13e.png)

You can implement the search field as an *input* element that is placed outside the HTML form. The filtering logic shown in the image is *case insensitive*, meaning that the search term arto also returns results that contain Arto with an uppercase A.

**NB:** When you are working on new functionality, it's often useful to "hardcode" some dummy data into your application, e.g.

```javascript
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // ...
}
```

This saves you from having to manually input data into your application for testing out your new functionality.

### 2.10: The Phonebook Step5

If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the *App* root component.

It is sufficient to extract three components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people into the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.

The application's root component could look similar to this after the refactoring. The refactored root component below only renders titles and lets the extracted components take care of the rest.


```javascript
const App = () => {
  // ...

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm 
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )
}
```

### Exercises 2.11.

We continue with developing the phonebook. Store the initial state of the application in the file *db.json*, which should be placed in the root of the project.

```json
{
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}
```

Start json-server on port 3001 and make sure that the server returns the list of people by going to the address http://localhost:3001/persons in the browser.

Modify the application such that the initial state of the data is fetched from the server using the axios-library. Complete the fetching with an [Effect hook](https://reactjs.org/docs/hooks-effect.html).

### 2.15: Phonebook step7

Let's return to our phonebook application.

Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.

### 2.16: Phonebook step8

Extract the code that handles the communication with the backend into its own module by following the example shown earlier in this part of the course material.

### 2.17: Phonebook step9

Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the [window.confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) method:

![2.17](https://fullstackopen.com/static/591ebc9e0e2dc651c0d2877efd763a59/5a190/24e.png)

The associated resource for a person in the backend can be deleted by making an HTTP DELETE request to the resource's URL. If we are deleting e.g. a person who has the *id* 2, we would have to make an HTTP DELETE request to the URL `localhost:3001/persons/2`. No data is sent with the request.

You can make an HTTP DELETE request with the axios library in the same way that we make all of the other requests.

NB: You can't use the name `delete` for a variable because it's a reserved word in JavaScript. E.g. the following is not possible:

```js
// use some other name for variable!
const delete = (id) => {
  // ...
}
```

### 2.18*: Phonebook step10

Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. It's recommended to use the HTTP PUT method for updating the phone number.

If the person's information is already in the phonebook, the application can confirm the action from the user:

![](https://fullstackopen.com/static/7353398520426bd823cf92202767653f/5a190/16e.png)


### 2.19: Phonebook step11
Use the improved error message example from part 2 as a guide to show a notification that lasts for a few seconds after a successful operation is executed (a person is added or a number is changed):

![](https://fullstackopen.com/static/da9af454f06489ca6e7453150beda738/5a190/27e.png)

### 2.20*: Phonebook step12

Open your application in two browsers. If you delete a person in browser 1 a short while before attempting to change the person's phone number in browser 2, you will get the following error message:

![](https://fullstackopen.com/static/be832524a82a387fb3adddda37eaa149/5a190/29b.png)

Fix the issue according to the example shown in promise and errors in part 2. Modify the example so that the user is shown a message when the operation does not succeed. The messages shown for successful and unsuccessful events should look different:

![](https://fullstackopen.com/static/dfc66f03514b3f013cf19ba1339ba34f/5a190/28e.png)

*Note* that even if you handle the exception, the error message is printed to the console.

