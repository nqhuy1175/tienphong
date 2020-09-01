import AsyncStorage from '@react-native-community/async-storage';
import {compact} from 'lodash';
import {applyMiddleware, compose, createStore, Store} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import config from '../../config';
import rootReducer from './rootReducer';
import sagas from './rootSaga';

/**
 * --------------------------------------------------*
 * Persist config documentation
 * https://github.com/rt2zz/redux-persist/blob/master/src/types.js#L13-L27
 * --------------------------------------------------*
 */

const persistConfig = {
  key: config.REDUX_KEY_STORE + '_' + config.STORE_VERSION,
  version: config.STORE_VERSION,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
  whitelist: ['app']
};

const reducers = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = compact([sagaMiddleware, __DEV__ ? createLogger() : null]);

// const enhancers = [applyMiddleware(...middlewares)];

export function initializeStore(): Store {
  const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagas);
  return store;
}

export function rehydrateStore(store: Store, callback: CallbackFunction) {
  return persistStore(store, {}, () => {
    console.log('LOAD PERSIST STORE SUCCESS');
    callback();
  });
}
