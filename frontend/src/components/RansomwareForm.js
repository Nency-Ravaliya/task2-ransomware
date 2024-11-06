import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RansomwareForm.css';

const RansomwareForm = ({ existingData, setExistingData, onAddOrUpdateData }) => {
    const [name, setName] = useState(existingData?.name.join(', ') || '');
    const [extensions, setExtensions] = useState(existingData?.extensions || '');
    const [encryptionAlgorithm, setEncryptionAlgorithm] = useState(existingData?.encryptionAlgorithm || '');
    const [ransomNoteFilenames, setRansomNoteFilenames] = useState(existingData?.ransomNoteFilenames || '');
    const [comment, setComment] = useState(existingData?.comment || '');
    const [decryptor, setDecryptor] = useState(existingData?.decryptor || '');
    const [extensionPattern, setExtensionPattern] = useState(existingData?.extensionPattern || '');
    const [iocs, setIocs] = useState(existingData?.iocs || '');
    const [microsoftDetectionName, setMicrosoftDetectionName] = useState(existingData?.microsoftDetectionName || '');
    const [microsoftInfo, setMicrosoftInfo] = useState(existingData?.microsoftInfo || '');
    const [sandbox, setSandbox] = useState(existingData?.sandbox || '');
    const [resources, setResources] = useState(existingData?.resources?.join(', ') || '');
    const [screenshots, setScreenshots] = useState(existingData?.screenshots || '');
    const [snort, setSnort] = useState(existingData?.snort || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            name: [name],
            extensions,
            encryptionAlgorithm,
            ransomNoteFilenames,
            comment,
            decryptor,
            extensionPattern,
            iocs,
            microsoftDetectionName,
            microsoftInfo,
            sandbox,
            resources: resources.split(',').map(link => link.trim()),
            screenshots,
            snort,
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
            // Reset form fields
            setName('');
            setExtensions('');
            setEncryptionAlgorithm('');
            setRansomNoteFilenames('');
            setComment('');
            setDecryptor('');
            setExtensionPattern('');
            setIocs('');
            setMicrosoftDetectionName('');
            setMicrosoftInfo('');
            setSandbox('');
            setResources('');
            setScreenshots('');
            setSnort('');
            setExistingData(null); // Reset existing data after submission
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
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Decryptor"
                value={decryptor}
                onChange={(e) => setDecryptor(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Extension Pattern"
                value={extensionPattern}
                onChange={(e) => setExtensionPattern(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                placeholder="IOCs"
                value={iocs}
                onChange={(e) => setIocs(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Microsoft Detection Name"
                value={microsoftDetectionName}
                onChange={(e) => setMicrosoftDetectionName(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Microsoft Info"
                value={microsoftInfo}
                onChange={(e) => setMicrosoftInfo(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Sandbox"
                value={sandbox}
                onChange={(e) => setSandbox(e.target.value)}
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
            <input
                type="text"
                placeholder="Screenshots"
                value={screenshots}
                onChange={(e) => setScreenshots(e.target.value)}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Snort"
                value={snort}
                onChange={(e) => setSnort(e.target.value)}
                className="form-input"
            />
            <button type="submit" className="form-button">
                {existingData ? 'Update' : 'Add'} Data
            </button>
        </form>
    );
};

export default RansomwareForm;
