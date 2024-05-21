import React from 'react'
import { IMessage } from '../../types/system'

interface IAsyncHandler {
    callback: () => Promise<void>
}
export const useAsyncHandler = () => {

    const asyncHandler = async (callback: IAsyncHandler["callback"]) => {
        callback().catch((error) => {
            console.log('error: ', error);
            if (error?.data?.errorMessages?.length) {
                const errorMessages = error.data.errorMessages as IMessage[]
                
                console.error(errorMessages)
            }
            else if (error?.data?.errorMessages?.length) {
                const warningMessages = error.data.warningMessages as IMessage[]
                console.warn(warningMessages)
            }else {
                console.error(error)
            }
        })

    }

    return { asyncHandler }
}
