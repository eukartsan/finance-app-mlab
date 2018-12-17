import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App/App';

ReactDOM.render(<App
    url='http://localhost:3001/api/comments'
    pollInterval={2000}
/>, document.getElementById('root'));
