import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DrawerState {
    open: boolean
}
const initialState: DrawerState = { open: false }

export const modal = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state) => {
            state.open = !state.open
        }
    }
})

export const { setModal } = modal.actions
export default modal.reducer