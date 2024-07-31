import React from 'react';

const FileDetails = ({ file }) => {
    return (
        <div>
            <h2>File Details</h2>
            <p>ID: {file.id}</p>
            <p>Name: {file.file_name}</p>
            <p>Path: {file.file_path}</p>
        </div>
    );
};

export default FileDetails;
