import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';

// @ts-ignore
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__) || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)));


export default store;
