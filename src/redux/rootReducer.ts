import {app} from '@redux/App/app.reducer';
import {combineReducers, Reducer} from 'redux';

const rootReducer: Reducer = combineReducers({
  app
});

export default rootReducer;
