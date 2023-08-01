import 'core-js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { HashRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import { App } from './App';
import { fetchMiljoList, fetchIsAdmin } from '~/actions/menyValgActionsUtil';
import { setPing } from '~/actions/pingActions';
import { getPing } from './api';

const history = createHistory();
export const store = configureStore(history);
const target = document.getElementById('root');

store.dispatch(fetchMiljoList());
getPing().then((ping) =>
    store.dispatch(setPing({ json: ping, env: 'ikke valgt' })),
);
store.dispatch(fetchIsAdmin());

createRoot(target).render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
);

if (module.hot) {
    module.hot.accept('./App', () => {
        createRoot(target).render(
            <Provider store={store}>
                <HashRouter history={history}>
                    <App />
                </HashRouter>
            </Provider>,
        );
    });
}
