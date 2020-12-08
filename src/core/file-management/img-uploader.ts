import { injectable } from "inversify";
import multer from "multer";

import { middleware } from "../../abstract/type/type-middleware";
import { IImgUploader } from "./int-img-uploader";

@injectable()
export default class ImgUploader implements IImgUploader{

    private static mimesTypes = [
        {
            mime  : "image/png",
            ext : "png"
        }, 
        {
            mime : "image/jpeg",
            ext : "jpg"
        },
        {
            mime: "image/svg+xml",
            ext : "svg"
        }
    ]

    /**
     * For parsing and uploading the img files
     * 
     * @param string dir (upload directory)
     * @param string fieldname
     * 
     * @return middleware
     */
    public  upload (dir : string, fieldName : string) : middleware {
        
        const storage = this.configuation(dir)

        const uploader = multer({storage}).single(fieldName)

        return uploader
    }

    private  configuation (dir : string) : multer.StorageEngine {
        return multer.diskStorage({

            destination: function (req, file, cb) {
                cb(null, dir)
              },

              filename: function (req, file, cb) {
                const mime = ImgUploader.mimesTypes.find(obj => obj.mime === file.mimetype)
                
                if(!mime) throw new Error ("Bad extension for the file")

                cb(null, file.fieldname + '-' + Date.now() + "." + mime?.ext)
              }
        })
    }

}