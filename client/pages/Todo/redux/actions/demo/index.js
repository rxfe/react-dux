/**
 * @file action
 */

import { UPDATE_DATA, ADD_DATA, DELETE_DATA } from './actionTypes'

export function updateData(data) {
  return {
    type: UPDATE_DATA,
    payload: data
  }
}

export function addData(data) {
  return {
    type: ADD_DATA,
    payload: data
  }
}

export function deleteData(id) {
  return {
    type: DELETE_DATA,
    payload: id
  }
}
