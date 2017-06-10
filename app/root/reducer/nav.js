import RootNavigator from  '../root-navigator';



const initialState = RootNavigator.router.getStateForAction(
  // RootNavigator.router.getActionForPathAndParams('Login')
  RootNavigator.router.getActionForPathAndParams('Lab')
);

const nav = function navReducer(state = initialState, action) {
  const state_prev = state;
  const state_next = RootNavigator.router.getStateForAction(action, state_prev);
  return state_next;
};


export default nav;
