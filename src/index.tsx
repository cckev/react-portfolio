import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import projectsReducer from './store/reducers/projects';
import { createStore, applyMiddleware } from 'redux';
import rootSaga from './store/sagas/root';
import createSagaMiddleware from 'redux-saga';

//configureProjectsStore();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  projectsReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
