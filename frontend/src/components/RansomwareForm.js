import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RansomwareForm.css';

const RansomwareForm = ({ existingData, fetchRansomwareData, setExistingData }) => {
    const [name, setName] = useState(existingData?.name || '');
    const [extensions, setExtensions] = useState(existingData?.extensions || '');
    const [encryptionAlgorithm, setEncryptionAlgorithm] = useState(existingData?.encryptionAlgorithm || '');
    const [ransomNoteFilenames, setRansomNoteFilenames] = useState(existingData?.ransomNoteFilenames || '');
    const [resources, setResources] = useState(existingData?.resources?.join(', ') || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            name: [name],
            extensions,
            encryptionAlgorithm,
            ransomNoteFilenames,
            resources: resources.split(',').map(link => link.trim()),
        };
    
        try {
            if (existingData) {
                // Update existing data
                await axios.put(`https://task2-web-app-ajeyayfpdqhdh2ec.centralindia-01.azurewebsites.net/ransomware/${existingData._id}`, newData);
                setExistingData(null); // Reset the form
            } else {
                // Add new data
                await axios.post('https://task2-web-app-ajeyayfpdqhdh2ec.centralindia-01.azurewebsites.net/ransomware', newData);
            }
            fetchRansomwareData();  // Refresh the data
            setName('');
            setExtensions('');
            setEncryptionAlgorithm('');
            setRansomNoteFilenames('');
            setResources('');
        } catch (error) {
            console.error("Error adding/updating data:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="ransomware-form">
            <h2>{existingData ? 'Update' : 'Add'} Ransomware Data</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="text"
                placeholder="Extensions"
                value={extensions}
                onChange={(e) => setExtensions(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="text"
                placeholder="Encryption Algorithm"
                value={encryptionAlgorithm}
                onChange={(e) => setEncryptionAlgorithm(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="text"
                placeholder="Ransom Note Filenames"
                value={ransomNoteFilenames}
                onChange={(e) => setRansomNoteFilenames(e.target.value)}
                required
                className="form-input"
            />
            <input
                type="text"
                placeholder="Resources (comma-separated)"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                required
                className="form-input"
            />
            <button type="submit" className="form-button">
                {existingData ? 'Update' : 'Add'} Data
            </button>
        </form>
    );
};

export default RansomwareForm;
