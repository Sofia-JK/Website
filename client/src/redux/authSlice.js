import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    token: localStorage.getItem('token'),
    role: localStorage.getItem("role"),
    nickname: localStorage.getItem("nickname"),
    adress: localStorage.getItem("adress"),
    fio: localStorage.getItem("fio"),
    namber: localStorage.getItem("namber"),
    id: localStorage.getItem("id"),
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.loading = true
            state.nickname = undefined
            state.adress = undefined
            state.fio = undefined
            state.namber = undefined
            state.role = undefined
            state.token = undefined
            state.id = undefined

            localStorage.removeItem("nickname")
            localStorage.removeItem("adress")
            localStorage.removeItem("fio")
            localStorage.removeItem("namber")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
            localStorage.removeItem("id")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const payload = action.payload
            state.nickname = payload.user.nickname
            state.adress = payload.user.adresss
            state.fio = payload.user.fio
            state.namber = payload.user.namber
            state.role = payload.user.role
            state.token = payload.token
            state.id = payload.id

            localStorage.setItem("nickname", payload.user.nickname)
            localStorage.setItem("adress", payload.user.adress)
            localStorage.setItem("fio", payload.user.fio)
            localStorage.setItem("namber", payload.user.namber)
            localStorage.setItem("role", payload.user.role)
            localStorage.setItem("token", payload.token)
            localStorage.setItem("id", payload.user.id)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const loginThunk = createAsyncThunk("logThunk", async (data, { rejectWithValue }) => {
    const { nickname, password } = data

    try {
        const result = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            return rejectWithValue(json)
        }
        window.location.reload();
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

// Action creators are generated for each case reducer function
export const { logOut } = authSlice.actions

export default authSlice.reducer