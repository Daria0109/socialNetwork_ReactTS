import React from 'react';
import './index.css';
import store from './redux/redux-store'
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
          <Provider store={store}>
                <App />
          </Provider>
        </BrowserRouter>, document.getElementById('root')
    );
}

rerenderEntireTree();

store.subscribe(() => {
    rerenderEntireTree()
});


