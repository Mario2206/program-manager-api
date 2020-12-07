import { IFileManager } from "./int-file-manager";
import fs from "fs"
import { injectable } from "inversify";


@injectable()
export default class FileManager implements IFileManager {


    public delete(filename : string, dir : string) : Promise<void> {

        return new Promise((resolve, reject) => {
            fs.rm( dir + "/" + filename, (err)=> {

                if(err) {
                    return reject(err)
                }

                return resolve()
            })
        })


    }

}