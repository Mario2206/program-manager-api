import { Request } from "express";
import { IELitteralObject } from "./int-common";

export interface CustomRequest extends Request {
    payload : IELitteralObject
}