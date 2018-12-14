import axios from 'axios'

import {SET_AUTH} from '../constants/auth'

export const _setAuth = auth => ({
  type: SET_AUTH,
  auth
})

export const setAuth = ({token}) => {
  return (dispatch) => {
    axios.get('/api/auth', {
      headers: {
        authorization: token
      }
    })
      .then(response => response.data)
      .then(auth => dispatch(_setAuth(auth)))
  }
}
