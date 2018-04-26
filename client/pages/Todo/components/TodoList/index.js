/**
 * @file todo list
 */
import React from 'react'
import PropTypes from 'prop-types'

function TodoList({ todos }) {
  const list = todos.map((item, index) => <li key={index}>{item}</li>)
  return (
    <ul>
      {list}
    </ul>
  )
}
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TodoList
