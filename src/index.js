import React from 'react'
import ReactDOM from 'react-dom'
import App from './component/App/App'
import { Provider } from 'react-redux'
import {store} from '../store/Store'

ReactDOM.render(
    <Provider store={store}>
    <App
    url='http://localhost:3001/api/finance'
    pollInterval={2000}/>
    </Provider>,
    document.getElementById('root'));
