import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    message: undefined,
    error: undefined
}

export const addrequestSlice = createSlice({
    name: 'addrequest',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.message = undefined
            state.error = undefined
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addrequestThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addrequestThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.message = payload.message
            state.loading = false
        })
        builder.addCase(addrequestThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload
            state.loading = false
        })
    }
})

export const addrequestThunk = createAsyncThunk("addrequestThunk", async (data, { rejectWithValue }) => {
    try {
        const result = await fetch('http://localhost:3000/addrequest', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            rejectWithValue(json)
        }
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue("Чтото пошло не так")
    }
})

export const adminThunk = createAsyncThunk("adminThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:3000/sendadmin', {
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
        return json
        
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})


export const yesThunk = createAsyncThunk("yesThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:3000/yesadmin', {
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

export const noThunk = createAsyncThunk("noThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:3000/noadmin', {
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

export const numberThunk = createAsyncThunk("numberThunk", async (data, { rejectWithValue }) => {
    const { id } = data

    try {
        const result = await fetch('http://localhost:3000/number', {
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
        return json
        
        
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

// Action creators are generated for each case reducer function
export const { reset } = addrequestSlice.actions

export default addrequestSlice.reducer