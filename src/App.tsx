import React, { useState } from 'react';
import { FileModel } from './models/FileModel';
import './services/ApiService';
import { ApiService } from './services/ApiService';
import { SaveMediaOutputModel } from './models/SaveMediaOutputModel';

function App() {
  const [selectedBlob, setSelectedBlob] = useState();
  const [selectedFile, setSelectedFile] = useState(new FileModel(null));
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [apiResults, setApiResults] = useState(new SaveMediaOutputModel(null));
  
  let apiService = new ApiService();

  // Handler when user selects a file
  const changeHandler = (event: any) => {
    let file: any = event.target.files[0];
    setSelectedBlob(file);
    setSelectedFile(file);
		setIsFilePicked(true);
	};

  // Handler when user selects to upload a file
  const handleSubmission = async () => {
    let result = await apiService.saveMedia(selectedFile);
    console.debug('Save media for ism was called');
    console.debug(result);
    let saveMediaOutputModel = new SaveMediaOutputModel(result);
    setApiResults(() => saveMediaOutputModel);
  };
  
 

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div className='row'>
					<div>Filename: {selectedFile.name}</div>
					<div>Filetype: {selectedFile.type}</div>
					<div>Size in bytes: {selectedFile.size}</div>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
      </div>

      <div></div>
      <div><a href={apiResults.mediaPointer}>{apiResults.mediaPointer}</a></div>
		</div>
	)
}

export default App
