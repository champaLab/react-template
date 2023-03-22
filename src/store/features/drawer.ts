import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DrawerState {
    open: boolean
}
const initialState: DrawerState = { open: true }

export const drawer = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setCloseDrawer: (state) => {
            state.open = false;
        },
        setOpenDrawer: (state) => {
            state.open = true
        }
    }
})

export const { setCloseDrawer, setOpenDrawer } = drawer.actions
export default drawer.reducer