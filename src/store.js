import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import thunk from 'redux-thunk';

import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers/index.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: "root",
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))

let persistor = persistStore(store)

export {store, persistor}