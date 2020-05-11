import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/shared/App';
import * as serviceWorker from './serviceWorker';

const render = (Component) => ReactDOM.render(<Component />, document.getElementById('root'));

render(hot(App));

serviceWorker.register();
