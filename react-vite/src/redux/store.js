import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import groupsReducer from "./groups"
import expensesReducer from "./expenses";
import groupMembersReducer from "./group_members"
import expenseDetailsReducer from "./expense_details";

const rootReducer = combineReducers({
  session: sessionReducer,
  groups: groupsReducer,
  expenses: expensesReducer,
  groupMembers: groupMembersReducer,
  expenseDetails: expenseDetailsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
