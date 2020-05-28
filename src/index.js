import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'Sw/swRegister';
import App from 'Components/pages/App';

const render = (Component) => ReactDOM.render(<Component />, document.getElementById('root'));

render(hot(App));

serviceWorker.register();
