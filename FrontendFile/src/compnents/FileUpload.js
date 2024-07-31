import React, { useState, useRef } from 'react';
import { uploadFile } from '../services/fileService';

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                await uploadFile(file);
                onUpload(); 
                alert('File uploaded successfully');
                setFile(null); 
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; 
                }
            } catch (error) {
                console.error(error);
                alert('Error uploading file');
            }
        } else {
            alert('Please select a file');
        }
    };

    return (
        <div className="file-upload">
            <input 
                type="file" 
                onChange={handleFileChange} 
                ref={fileInputRef} 
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
