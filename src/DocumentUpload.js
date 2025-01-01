import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DocumentUpload.css'; 

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  // Configure the dropzone
  const onDrop = (acceptedFiles, rejectedFiles) => {
    // Handle rejected files, e.g., size limit or incorrect file type
    if (rejectedFiles.length > 0) {
      setError('File type not supported or file is too large.');
    } else {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setError(null); // Clear any previous error
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pdf,.doc,.docx,.txt', // Accept only specific file types
    maxSize: 10 * 1024 * 1024, // Max file size: 10MB
  });

  
  const handleSubmit = async () => {
    try {

      if (!file) {
        alert('No file selected');
        return;
      }
  
      // You can implement your API call here to upload the document
      console.log('Uploading document:', file);
  
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
      
      
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error('Error in API call');
      }

      // Parse the JSON response
      const data = await response.json();
      
      alert("Response : "+data.message)
      // Set the result in the state
      //setResult(data.result);
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError('Invalid input or something went wrong!');
      //setResult(null);  // Clear previous results
    }
  };

  return (
    <div className="document-upload">

      <div className="grid-container">
        
        <div className="dropdown-column">
          <select className="dropdown">
            <option value="">Select file type</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>

        <div className="content-column">
          <div {...getRootProps()} style={styles.dropzone}>
            <input {...getInputProps()} />
            <p>Browse a file</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

         
        </div>
        
        <div className="button-column">
          <button onClick={handleSubmit} disabled={!file} style={styles.uploadButton}>
            Add Input Document
          </button>
        </div>
      </div>   

      <div>
        {file && (
          <div style={styles.fileInfo}>
            <strong>Selected File:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
        )}
      </div> 
     
    </div>  
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #4CAF50',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  fileInfo: {
    marginTop: '10px',
  },
  uploadButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DocumentUpload;
