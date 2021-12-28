## Exercises 1.12.-1.14.

### 1.12*: anecdotes step1

The world of software engineering is filled with anecdotes that distill timeless truths from our field into short one-liners.

Expand the following application by adding a button that can be clicked to display a random anecdote from the field of software engineering:

```javascript
import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {anecdotes[selected]}
    </div>
  )
}

export default App
```

Content of the file index.js is same as in previous exercises.

Find out how to generate random numbers in JavaScript, eg. via search engine or on [Mozilla Developer Network](https://developer.mozilla.org/en-US/). Remember that you can test generating random numbers e.g. straight in the console of your browser.

Your finished application could look something like this:

![anecdotes 1.12](https://fullstackopen.com/static/8577fa00fc4d946e2322de9b2707c89c/5a190/18a.png)

### 1.13*: anecdotes step2

Expand your application so that you can vote for the displayed anecdote.

![anecdotes 1.13](https://fullstackopen.com/static/06f95cb43a18bd6429174200a8d17cff/5a190/19a.png)

**NB** store the votes of each anecdote into an array or object in the component's state. Remember that the correct way of updating state stored in complex data structures like objects and arrays is to make a copy of the state.

You can create a copy of an object like this:

```javascript
const points = { 0: 1, 1: 3, 2: 4, 3: 2 }

const copy = { ...points }
// increment the property 2 value by one
copy[2] += 1  
```

OR a copy of an array like this:

```javascript
const points = [1, 4, 6, 3]

const copy = [...points]
// increment the value in position 2 by one
copy[2] += 1  
```

Using an array might be the simpler choice in this case. Searching the Internet will provide you with lots of hints on how to [create a zero-filled array of a desired length](https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781).

### 1.14*: anecdotes step3

Now implement the final version of the application that displays the anecdote with the largest number of votes:

![](https://fullstackopen.com/static/3e8638efbbbbcabac7bb79466ab3a5f6/5a190/20a.png)

If multiple anecdotes are tied for first place it is sufficient to just show one of them.