import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (!file) {
      alert('No file selected!');
      return;
    }
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      onFileSelect(file); 
    } else {
      alert('Please select an audio file.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="audio/*" />
      {selectedFile && <p>Uploaded File: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
