import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import main from './main/reducer'
import instructor from './instructor/reducer'

const authPersistConfig = { key: 'mainauth', storage }
export default combineReducers({
  main: persistReducer(authPersistConfig, main),
  instructor
})
