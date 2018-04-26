/**
 * @file todo list
 */
import React from 'react'
import PropTypes from 'prop-types'

function AuthorList({ authors }) {
  const list = authors.map((item, index) => <li key={index}>{item.name}</li>)
  return (
    <ul>
      {list}
    </ul>
  )
}
AuthorList.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AuthorList
