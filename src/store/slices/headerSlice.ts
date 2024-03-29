import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    name: ""
};
export const headerSlice = createSlice({
    name: "header",
    initialState: initialState,
    reducers: {
        setHeader: (state, action) => {
            state.name = action.payload;
        },
    },
});

export default headerSlice.reducer;
export const { setHeader } = headerSlice.actions;