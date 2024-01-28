import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true
        },
        sigInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {signInFailure, sigInSuccess, signInStart} = userSlice.actions;
export default userSlice.reducer;