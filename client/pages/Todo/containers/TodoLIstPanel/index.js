/**
 * @file show todo list
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TodoList from '../../components/TodoList'

class TodoListPanel extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render() {
    const { todos } = this.props
    return (
      <div>
        <TodoList todos={todos} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos
})

export default connect(mapStateToProps)(TodoListPanel)
