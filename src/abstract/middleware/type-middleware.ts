import { NextFunction, Response, Request } from "express";

export type middleware = (req : Request, res : Response, next : NextFunction)=>Promise<void> | void