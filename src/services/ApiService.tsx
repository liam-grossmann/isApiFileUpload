import { FileModel } from '../models/FileModel';
import { SaveMediaInputModel } from '../models/SaveMediaInputModel';

export class ApiService {

    constructor() { }

    // private rootUrl = 'https://localhost:7221/';
    private rootUrl = ' https://devapi.is.fun/';
    

    // fileToSave will be a blob. Must implement blob to allow us to base64encode it.
    async saveMedia(fileToSave: any) : Promise<any> {
        let url = this.rootUrl + 'SaveMedia';

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
        

        let inputModel = new SaveMediaInputModel();
        inputModel.code = 'B1CC317D-20E6-4E37-A801-1CCE2ED7611D' // code for ism 'China is TikTok'
        inputModel.subjectType = 'Ism';   // change to Concat or Iser 
        inputModel.imageBytes = String(base64EncodedString);
        inputModel.mediaType = fileToSave.name.split('.').pop().toLowerCase(); 

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
