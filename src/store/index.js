import { persistStore } from 'redux-persist'
import { createStore } from 'redux'
import rootReducer from './modules/rootReducer'

import persistReducers from './persistReducers'

const store = createStore(persistReducers(rootReducer))

const persistor = persistStore(store)

export { store, persistor }
