const usersSelector = state => (state).get("usersReducer");

export const allUsersSelector = state => usersSelector(state).get("allUsers");
export const certainUserSelector = state => usersSelector(state).get("certainUser");
export const isLoadingUserSelector = state => usersSelector(state).get("isLoading");


