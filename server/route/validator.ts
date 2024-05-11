
import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { __Response__ } from '../../types/express';
import { validationResult } from 'express-validator';
import { IBaseResponse } from '../../types/system';

export const validatorRun =  async (req: any, res: any, next: any): Promise<void> => {
    const response = new __Response__<IBaseResponse["data"]>();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        response.errorMessages = errors.array()
        res.status(400).json(response);
        return
    }
    next()

}