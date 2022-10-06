export class SaveMediaForIsmOutputModel {

    constructor(data: any) {
        if (data) {
            this.mediaId = data.mediaId;
            this.mediaTypeId = data.mediaTypeId;
            this.mediaStored = data.mediaStored;
            this.mediaPointer = data.mediaPointer;
            this.mediaPartnerInstanceId = data.mediaPartnerInstanceId;
            this.createdDate = data.createdDate;
            this.updatedDate = data.updatedDate;
            this.isHidden = data.isHidden;
        }
    }

    public mediaId?: number;
    public mediaTypeId?: number;
    public mediaStored?: string;
    public mediaPointer?: string; 
    public mediaPartnerInstanceId?: number;
    public createdDate?: string;
    public updatedDate?: string;
    public isHidden?: boolean;
  }