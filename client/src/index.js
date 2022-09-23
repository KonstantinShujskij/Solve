import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { compose, createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './redux/rootReducer'
import App from './App'

import './styles/main.css'

const persistConfig = {key: 'root', storage}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
