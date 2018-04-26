/**
 * @file todo list
 */
import React from 'react'
import PropTypes from 'prop-types'

function AuthorList({ authors }) {
  const list = authors.map((item, index) => {
    const { name, github } = item
    return (
      <li key={index}>
        <a href={github}>{name}</a>
      </li>
    )
  })
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
