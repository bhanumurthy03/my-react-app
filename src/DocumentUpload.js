import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        <p>Drag & drop a document here, or click to select a file</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {file && (
        <div style={styles.fileInfo}>
          <strong>Selected File:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}

      <button onClick={handleSubmit} disabled={!file} style={styles.uploadButton}>
        Upload Document
      </button>
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #007BFF',
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
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default DocumentUpload;
