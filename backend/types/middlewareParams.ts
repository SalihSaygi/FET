import { Request, Response, NextFunction } from 'express'
import HttpException from './HttpException'

export type middlewareParams = (err: HttpException, req: Request, res: Response, next: NextFunction) => void