/**
 * @file action
 */

import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from './actionTypes'

export function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: text
  }
}
export function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    payload: index
  }
}
export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: filter
  }
}
