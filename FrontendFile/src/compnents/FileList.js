import React, { useEffect, useState } from 'react';
import { getAllFiles, deleteFile, editFile } from '../services/fileService';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [editFileId, setEditFileId] = useState(null);
    const [editFileData, setEditFileData] = useState(null);

    const fetchFiles = async () => {
        try {
            const response = await getAllFiles();
            setFiles(response.data.files);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteFile(id);
            fetchFiles(); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (file) => {
        setEditFileId(file.id);
        setEditFileData(file);
    };

    const handleFileChange = (e) => {
        setEditFileData({
            ...editFileData,
            file: e.target.files[0]
        });
    };

    const handleEditSave = async () => {
        try {
            await editFile(editFileId, editFileData.file);
            setEditFileId(null);
            setEditFileData(null);
            fetchFiles(); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditCancel = () => {
        setEditFileId(null);
        setEditFileData(null);
    };

    return (
        <div className="file-list">
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        {file.file_name}
                        <div>
                            <button className="edit" onClick={() => handleEdit(file)}>Edit</button>
                            <button onClick={() => handleDelete(file.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {editFileId && (
                <div className="edit-file">
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleEditSave}>Save</button>
                    <br></br>
                    <button className="cancel-button" onClick={handleEditCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default FileList;
