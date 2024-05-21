import React, { useContext } from 'react'

import { useDispatch, useSelector } from 'react-redux' 
import { AppDispatch, RootState } from '../provider/redux.provider';

export const useContextProvider = function<T>(Context: React.Context<T | null>){
    const context = useContext(Context);

    if (!context) {
        throw new Error('Context must be used inside the Provider');
    }

    return context;
}


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()