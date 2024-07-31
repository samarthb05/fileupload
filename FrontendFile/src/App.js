import React, { useState } from 'react';
import FileUpload from './compnents/FileUpload';
import FileList from './compnents/FileList';
import './App.css';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handleUpload = () => {
        setRefresh(!refresh); 
    };

    return (
        <div>
            <h1>File Upload</h1>
            <FileUpload onUpload={handleUpload} />
            <FileList key={refresh} /> 
        </div>
    );
};

export default App;
