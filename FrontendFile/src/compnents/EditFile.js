import React, { useState } from 'react';
import { editFile } from '../services/fileService';

const EditFile = ({ file, onUpdate }) => {
    const [newFile, setNewFile] = useState(null);

    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    const handleUpdate = async () => {
        if (newFile) {
            try {
                await editFile(file.id, newFile);
                onUpdate();
                alert('File updated successfully');
            } catch (error) {
                alert('Error updating file');
            }
        } else {
            alert('Please select a file');
        }
    };

    return (
        <div>
            <h2>Edit File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default EditFile;
