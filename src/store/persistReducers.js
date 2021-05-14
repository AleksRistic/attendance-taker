import storageSession from 'redux-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      // transforms: [encryptor],
      key: 'srtreducers',
      storage: storageSession,
      whitelist: ['main', 'instructor']
    },
    reducers
  )

  return persistedReducer
}
