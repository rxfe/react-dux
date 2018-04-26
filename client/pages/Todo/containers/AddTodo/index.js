/**
 * @file add todo
 */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addTodo } from '../../redux/actions/todo'

class AddTodo extends React.Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.input = null
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
    if (!this.input.value.trim()) {
      return
    }
    this.input.value = ''
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit}
        >
          <input
            ref={(node) => { this.input = node }}
          />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addTodo: data => dispatch(addTodo(data))
})
export default connect(null, mapDispatchToProps)(AddTodo)
