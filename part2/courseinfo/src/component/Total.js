import React from "react";

const Total = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Total