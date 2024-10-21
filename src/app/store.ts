import {Action, combineSlices, configureStore, ThunkAction} from '@reduxjs/toolkit';
import { counterSlice } from '../features/counter/counterSlice';
import {setupListeners} from "@reduxjs/toolkit/query";
const rootReducer = combineSlices(counterSlice)
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        // Adding the api middleware enables caching, invalidation, polling,
        // middleware: {}
        // and other useful features of `rtk-query`.
        preloadedState,
    })

    setupListeners(store.dispatch)
    return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
