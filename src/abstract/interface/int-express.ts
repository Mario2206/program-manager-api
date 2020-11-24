import { Request } from "express";
import { User } from "../../model/user";
import { IELitteralObject } from "./int-common";

export interface CustomRequest extends Request {
    payload? : IELitteralObject,
    authClient? : User
}