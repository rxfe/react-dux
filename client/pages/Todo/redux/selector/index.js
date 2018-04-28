/**
 * @file selector for store
 */

import { createSelector } from 'reselect'

export const authorsSelector = state => state.authors
export const todosSelector = state => state.todos

export const mergeAuthorsAndTodso = createSelector(
  authorsSelector,
  todosSelector,
  (authors, todos) => {
    const authorsList = authors.list
    return authorsList.map(author => ({
      ...author,
      todos
    }))
  }
)
