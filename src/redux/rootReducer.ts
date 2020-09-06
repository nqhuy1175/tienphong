import {app} from '@redux/App/app.reducer';
import {categories} from '@redux/Feed/categories.reducer';
import {combineReducers, Reducer} from 'redux';

const rootReducer: Reducer = combineReducers({
  app,
  categories
});

export default rootReducer;
