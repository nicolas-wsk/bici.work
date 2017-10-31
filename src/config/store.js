import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' 
import app from './reducers'

const config = {
  key: 'root',
  storage,
}


// let storeInter = createStore((state, action) => (
// 	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
// ), INITIAL, window.devToolsExtension && window.devToolsExtension())
const reducer = persistCombineReducers(config,{app})

export function configureStore () {
  // ...
  let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  let persistor = persistStore(store)
  
  return { persistor, store }
}