import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCrediantials) => {

        const request = await axios.post('http://localhost:7000/api/v1/auth/login', userCrediantials)
        const response = await request.data;
        localStorage.setItem('loginToken', JSON.stringify(response))
        return response
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
    }, extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                // console.log("first", action)
                if (action.error.message === "Request failed with status code 400") {
                    state.error = "Access denied!, invalid creds"
                } else {
                    state.error = action.error.message
                }
            })
    }
})
export default userSlice.reducer;