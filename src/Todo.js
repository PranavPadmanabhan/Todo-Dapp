import React from 'react'
import './Todo.css'

function Todo({index, todo}) {
  return (
    <div className='todoContainer'>
        <span className="index">{index}.</span>
        <span className="todo">{todo}</span>
    </div>
  )
}

export default Todo