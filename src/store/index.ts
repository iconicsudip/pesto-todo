import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import headerSlice from "./slices/headerSlice";

export const store = configureStore({
    reducer: {
        userDetails: userSlice,
        headerDetails: headerSlice,
    },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;