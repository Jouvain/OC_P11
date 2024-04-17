import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    error: null,
}

export const loginUser = createAsyncThunk("user/loginUser", async (body, getState) => {
    
    //const bodyString = JSON.stringify(body)
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body
    })
    console.log(response)
    const data = await response.json()
    return data.body.token
})

const usersSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        signOut(state, action) {
            const existingToken = state.token
            if (existingToken) {
                state.token = null
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})

export default usersSlice.reducer

export const tokenUser = (state) => state.user.token
export const { signOut } = usersSlice.actions
