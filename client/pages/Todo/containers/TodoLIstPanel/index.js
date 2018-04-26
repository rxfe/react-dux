/**
 * @file show todo list
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TodoList from '../../components/TodoList'
import AuthorList from '../../components/AuthorList'
import { fetchAuthors } from '../../redux/actions/authors'

class TodoListPanel extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string).isRequired,
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAuthors: PropTypes.func.isRequired
  }

  render() {
    const { todos, authors } = this.props
    return (
      <div>
        { false && <TodoList todos={todos} />}
        <AuthorList authors={authors} />
        <button onClick={this.props.fetchAuthors}>异步获取数据</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  authors: state.authors.list
})

const mapDispatchToProps = dispatch => ({
  fetchAuthors: () => dispatch(fetchAuthors())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoListPanel)
