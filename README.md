# isApiFileUpload

Simple React application which demonstrates the file uplod for isApi.


*** PLEASE NOTE THAT VITE JS RUNS OFF http://127.0.0.1:3000 AND CORS IS ONLY ENABLED
   FOR localhost 3000 on out API.
   MAKE SURE YOU CHANGE TO localhost:3000 WHEN YOU RUN THE LOCAL SERVER. ***





## Installation 

    git clone https://github.com/liam-grossmann/isApiFileUpload.git

    npm install




## Build and Run

| Command       | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| npm run dev   | Supports HMR (hot module reloading). Serves from in-memory vite server. |
| npm run build | Production build to the dist folder.                                    |
| npm run serve | Serves from the dist folder.                                            | 




## Hosted

| Environment | Description                         | Url                                                 |
| ------------| ----------------------------------- | --------------------------------------------------- |
| Development | Hosted by ViteJs                    | http://localhost:3000/                              | 




## Dependencies

| Component     | Use                                        | Documentation                                           |
| ------------- | ------------------------------------------ | ------------------------------------------------------- |
| TypeScript    | Development Language                       | [TypeScript Home Page](https://www.typescriptlang.org/) | 
| React         | Responsive component based web application | [React Home Page](https://reactjs.org/)                 |
| ViteJs        | Build and bundling tool                    | [ViteJs Home Page](https://vitejs.dev/)                 |


## Technical Description

Application written using typescript and the latest version of react.

App.tsx is the main react component which prompts you to select a file.

Once you select a file, it is uploaded to the blob storage. You will get back the mediaId created (from the database) and
the url from the blob storage. Mediapointer will contain the blob storage url.

{
  "mediaId": 0,
  "mediaType": string,
  "mediaStored": "string",
  "mediaPointer": "string",
  "mediaPartnerInstanceId": 0,
  "createdDate": "2022-10-06T16:52:02.654Z",
  "updatedDate": "2022-10-06T16:52:02.654Z",
  "isHidden": true
}

Unfortunately for reasons I won't go into now, we need to base64 encode the files and send the correct file type to the server.

This is all handled in the ApiService.saveMedia method.

e.g.
 inputModel.code = '637F8E73-5169-4D74-BF08-3F0BA481D74F'
 inputModel.subjectType = 'Ism';
        inputModel.imageBytes = String(base64EncodedString);
        inputModel.mediaType = fileToSave.name.split('.').pop().toLowerCase(); 

Here we set the ism code, the base64 encoded string for the file, and the file extension

This is then posted to the API. 


I'll have to do a lot more testing to complete this but the basic API is working.