import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    error: null,
    status: "idle",
    user: {firstName:"", lastName:"", userName:"", id:""},
    isChecked: false
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

export const editUser = createAsyncThunk("user/editUser", async (bodytoken, thunkAPI) => {
    let bodyString = JSON.stringify(bodytoken.body)
    try{
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "PUT",
            headers: {"Content-Type": "application/json", Authorization: `Bearer${bodytoken.token}`},
            body: bodyString
        })
        const data = await response.json()
        return data.body.userName
    } catch (error) {
        return error
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
                state.isChecked = false
            }
        },
        rememberUser(state, action) {
            state.token = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload
                state.error = null
                state.status = "idle"
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload 
            })
            .addCase(fetchUser.pending, (state,action) => {
                state.status = "ongoing"
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (action.meta.arg === null) {
                    state.status = "authentification failure"
                    state.user = {firstName:"", lastName:"", userName:"", id:""}
                } else {
                    state.user = action.payload
                    state.status = "success"
                    state.error = null
                }

            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.payload
                state.status = "failure"
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user.userName = action.payload
                state.error = null
            })
            .addCase(editUser.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export default usersSlice.reducer

export const tokenUser = (state) => state.user.token
export const errorStatus = (state) => state.user.error
export const { signOut, rememberUser } = usersSlice.actions
