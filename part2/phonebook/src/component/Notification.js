import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.startsWith('Added') || message.startsWith('Updated')) {
    return (
      <div className='add'>
        {message}
      </div>
    )
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default Notification