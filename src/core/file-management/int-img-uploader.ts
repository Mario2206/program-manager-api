import { middleware } from "../../abstract/type/type-middleware";

export interface IImgUploader {
    upload (dir : string, fieldName : string) : middleware
}