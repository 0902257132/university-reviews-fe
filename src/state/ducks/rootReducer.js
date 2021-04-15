import { combineReducers } from 'redux';
import { homePageReducer } from 'state/ducks/common/reducers/home-page';
import { commentReducer } from 'state/ducks/common/reducers/comment';
import { loginReducer } from 'state/ducks/common/reducers/login';
import { dialogReducer } from 'state/ducks/common/reducers/dialog';

export const appReducer = combineReducers({
  homePage: homePageReducer,
  comment: commentReducer,
  login: loginReducer,
  dialog: dialogReducer,
});
