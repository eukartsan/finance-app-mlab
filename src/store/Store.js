import {createStore} from 'redux'
import {reducer, initialState} from '../reducers/Reducers'

export const store = createStore(reducer, initialState)