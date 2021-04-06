import { Request, Response, NextFunction } from 'express'
import HttpException from './HttpException'

export type middlewareParams = (req: Request, res: Response, next?: NextFunction, err?: HttpException) => {}