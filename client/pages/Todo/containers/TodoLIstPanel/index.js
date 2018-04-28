/**
 * @file show todo list
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import TodoList from '../../components/TodoList'
import AuthorList from '../../components/AuthorList'
import { fetchAuthors } from '../../redux/actions/authors'

// selector
import { todosSelector, authorsSelector, mergeAuthorsAndTodso } from '../../redux/selector'

class TodoListPanel extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    authorsWithTods: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAuthors: PropTypes.func.isRequired
  }

  render() {
    const { todos, authors, authorsWithTods } = this.props
    return (
      <div>
        <TodoList todos={todos} />
        <AuthorList authors={authors} />
        <button onClick={this.props.fetchAuthors}>异步获取数据</button>
        { authorsWithTods.map((item, index) => {
          const { name } = item
          return (
            <div key={`name_${index}`}>
              hello, my name is {name}, and my todo list is: {
                item.todos.map((todo, i) => <p key={`todo_${i}}`}>{todo}</p>)
              }
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: todosSelector(state),
  authors: authorsSelector(state).list,
  authorsWithTods: mergeAuthorsAndTodso(state)
})

const mapDispatchToProps = dispatch => ({
  fetchAuthors: () => dispatch(fetchAuthors())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPanel)
