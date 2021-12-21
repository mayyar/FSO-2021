# Exercises 1.1.-1.2.


## 1.1: course information, step1

Refactor the code so that it consists of three new components: Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. Header takes care of rendering the name of the course, Content renders the parts and their number of exercises and Total renders the total number of exercises.

Define the new components in file App.js.

### 1.2: course information, step2

Refactor the Content component so that it does not render any names of parts or their number of exercises by itself. Instead it only renders three Part components of which each renders the name and number of exercises of one part.