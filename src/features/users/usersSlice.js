import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    error: null,
    status: "idle",
    user: {firstName:"", lastName:"", userName:"", id:""},
}

export const loginUser = createAsyncThunk("user/loginUser", async (body, {rejectWithValue}) => {
    
    try{
        const response = await fetch("http://localhost:3001/api/v1/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: body
        })
        const data = await response.json()
        return data.body.token
    }
    catch(error) {
        return rejectWithValue("401")
    }

})

export const fetchUser = createAsyncThunk("user/fetchUser", async(token, thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: { Authorization: `Bearer${token}` }
        })
        const data = await response.json()
        return data.body
    } catch (error) {
        return error
    }
})

const usersSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        signOut(state, action) {
            const existingToken = state.token
            if (existingToken) {
                state.token = null
                state.status = "idle"
                state.user = {firstName:"", lastName:"", userName:"", id:""}
                state.error = null
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload
                
                
            })
            .addCase(fetchUser.pending, (state,action) => {
                state.status = "ongoing"
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "success"
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.payload
                state.status = "failure"
            })
    }
})

export default usersSlice.reducer

export const tokenUser = (state) => state.user.token
export const errorStatus = (state) => state.user.error
export const { signOut } = usersSlice.actions
