import React from "react"

const Part = ({ parts }) => {
    return (
        <div>
            {parts.map((part) =>
                <p key={part.id}>
                {part.name} {part.exercises}
                </p>
            )}
        </div>
    )
}

export default Part