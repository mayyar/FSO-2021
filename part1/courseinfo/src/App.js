import React from 'react';

const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part parts={course.parts}/>
    </div>
  )
}

const Total = ({ course }) => {
  const parts = course.parts
  return (
    <>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>  
    </>
  )
}

const Part = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) =>
        <p key={index}>
          {part.name} {part.exercises}
        </p>
      )}
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

export default App;