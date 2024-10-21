import type {PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from "../../app/store.ts";
import {createAppSlice} from "../../app/createAppSlice.ts";

export interface CounterSlice {
    value: number
    status: 'idle' | 'loading' | 'failed' | 'success'
}

const initialState: CounterSlice = {
    value: 0,
    status: 'idle',
}

export const counterSlice = createAppSlice({
    name: 'counter',
    initialState,
    reducers: create => ({
        increment: create.reducer(state => {
            state.value += 1
        }),
        decrement: create.reducer(state => {
            state.value -= 1
        }),
        incrementByAmount: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.value += action.payload
            },
        ),

        incrementAsync: create.asyncThunk(
            async (amount: number) => {
                const response = await fetchCount(amount)
                // The value we return becomes the `fulfilled` action payload
                return response.data
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.status = "idle"
                    state.value += action.payload
                },
                rejected: state => {
                    state.status = "failed"
                },
            },
        ),
    }),
    selectors: {
        selectCount: counter => counter.value,
        selectStatus: counter => counter.status,
    },
})

export const { decrement, increment, incrementByAmount, incrementAsync } =
    counterSlice.actions
// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCount, selectStatus } = counterSlice.selectors

// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
    return new Promise<{ data: number }>(resolve =>
        setTimeout(() => resolve({ data: amount }), 500),
    )
}

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
    (amount: number): AppThunk =>
        (dispatch, getState) => {
            const currentValue = selectCount(getState())

            if (currentValue % 2 === 1 || currentValue % 2 === -1) {
                dispatch(incrementByAmount(amount))
            }
        }
