import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserPayload {
    id: number
    username: string
    position: string
    isLogin: boolean
    token?: string
}
export interface UserState {
    id: number
    username: string
    role: string
    isLogin: boolean
    token?: string
}
const initialState: UserState = {
    id: 1,
    isLogin: true,
    role: 'admin',
    token: '123456789',
    username: 'Admin',

    // id: 0,
    // isLogin: false,
    // role: '',
    // token: '',
    // username: '',
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storeLogin: (state, { payload }: PayloadAction<UserPayload>) => {
            state.id = payload.id
            state.role = payload.position
            state.username = payload.username

            if (payload.token) {
                state.isLogin = true
                localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE, payload.token)
            }
        },
        storeRefresh: (state, { payload }: PayloadAction<UserPayload>) => {
            state.id = payload.id
            state.role = payload.position
            state.username = payload.username
            console.log(payload)
            if (payload.id) {
                state.isLogin = true
            }

        },
        storeLogout: (state) => {
            state.id = 0
            state.isLogin = false
            state.role = ''
            state.username = ''
            localStorage.removeItem(import.meta.env.VITE_APP_LOCAL_STORAGE)
        }

    }
})

export const { storeLogin, storeRefresh, storeLogout } = auth.actions
export default auth.reducer