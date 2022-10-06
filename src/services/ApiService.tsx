import { FileModel } from '../models/FileModel';
import { SaveMediaForIsmInputModel } from '../models/SaveMediaForIsmInputModel';

export class ApiService {

    constructor() { }

    // private rootUrl = 'https://localhost:7221/';
    private rootUrl = ' https://devapi.is.fun/';
    

    // fileToSave will be a blob. Must implement blob to allow us to base64encode it.
    async saveMediaForIsm(fileToSave: any) : Promise<any> {
        let url = this.rootUrl + 'SaveMediaForIsm';

        const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let encoded = reader.result?.toString().replace(/^data:(.*,)?/, '');
                if (encoded != null) {
                    if ((encoded.length % 4) > 0) {
                        encoded += '='.repeat(4 - (encoded.length % 4));
                    }
                }
                resolve(encoded);
            };
            reader.onerror = error => reject(error);
        });
        
        const base64EncodedString = await toBase64(fileToSave);
        console.debug('base 64 is');
        console.debug(base64EncodedString);
        

        let inputModel = new SaveMediaForIsmInputModel();
        inputModel.code = '637F8E73-5169-4D74-BF08-3F0BA481D74F'
        inputModel.imageBytes = String(base64EncodedString);
        inputModel.mediaTypeId = fileToSave.name.split('.').pop().toLowerCase(); 

        try {
            let res = await fetch(url, {
              "method": "POST",
              "headers": { 
                "content-type": "application/json", 
                "accept": "application/json" 
                },
                "body": JSON.stringify(inputModel)
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

}
