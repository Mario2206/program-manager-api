export interface IFileManager {
    delete(filename : string, dir : string) : Promise<void>
}