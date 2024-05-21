import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Session } from '../../types/response/user.interface'

interface IState {
    session: Session | null
}
const initialState: IState = {
    session: null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session | null>) => {
            state.session = action.payload
        },

    }
})

export const { setSession } = authSlice.actions

export default authSlice.reducer