const typingGameSelector = state => (state).get("typingGameReducer");

export const textSelector = state => typingGameSelector(state).get("text");
export const loadingStateSelector = state => typingGameSelector(state).get("loadingStates");
export const resultsSelector = state => typingGameSelector(state).get("results");

