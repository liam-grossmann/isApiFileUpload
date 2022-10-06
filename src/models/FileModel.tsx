export interface IFileModel {
    name?: string,
    type?: string,
    size?: number,
  }
  
export class FileModel implements IFileModel {

    constructor(blob: any) {
        if (blob) {
            this.name = blob.name;
            this.type = blob.type;
            this.size = blob.size;
        }
    }

    public name?: string;
    public type?: string;
    public size?: number;
}
  