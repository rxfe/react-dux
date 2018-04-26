/**
 * @file action
 */

import { FETCH_AUTHORS } from './actionTypes'

export function fetchAuthors() {
  return {
    type: FETCH_AUTHORS,
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        const isNormal = Math.random() > 0.5
        if (isNormal) {
          resolve([
            {
              name: 'lanmingming',
              github: 'github.com/Micleming'
            }
          ])
        } else {
          reject('error')
        }
      }, 1000)
    })
  }
}

