import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './App';
import { fetchMiljoList,fetchIsAdmin } from '~/actions/menyValgActionsUtil';
import { fetchMiljoList } from '~/actions/menyValgActionsUtil'; //Spør om miljoliste når siden lastes
import { setPing } from '~/actions/pingActions';
import { getPing } from './api';

const history = createHistory();
export const store = configureStore(history);
const target = document.getElementById('root');
store.dispatch(fetchMiljoList());
getPing().then(ping => store.dispatch(setPing(ping)));
store.dispatch(fetchIsAdmin());

store.subscribe(() => {
    console.log('Current state:', store.getState());
});

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    </AppContainer>,
    target
);

if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <App />
                    </ConnectedRouter>
                </Provider>
            </AppContainer>,
            target
        );
    });
}
