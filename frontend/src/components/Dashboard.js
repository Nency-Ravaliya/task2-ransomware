import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RansomwareForm from './RansomwareForm';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [existingData, setExistingData] = useState(null); // For editing
    const [isFormVisible, setIsFormVisible] = useState(false); // For controlling form visibility

    const fetchRansomwareData = async () => {
        try {
            const result = await axios.get('https://task2-web-app-ajeyayfpdqhdh2ec.centralindia-01.azurewebsites.net/ransomware');
            setData(result.data.reverse());
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRansomwareData();
    }, []);

    const handleEdit = (item) => {
        setExistingData(item);
        setIsFormVisible(true); // Show the form when editing
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://task2-web-app-ajeyayfpdqhdh2ec.centralindia-01.azurewebsites.net/ransomware/${id}`);
            setData(data.filter(item => item._id !== id)); // Update the state immediately
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleCloseForm = () => {
        setIsFormVisible(false); // Hide the form when closed
        setExistingData(null); // Reset the existing data
    };

    const handleAddOrUpdateData = (newData) => {
        if (existingData) {
            setData(data.map(item => (item._id === existingData._id ? newData : item))); // Update existing data
        } else {
            setData([newData, ...data]); // Add new data to the front
        }
        setExistingData(null); // Reset the existing data
        setIsFormVisible(false); // Hide the form
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error fetching data!</div>;

    return (
        <iv className="dashboard">
            <h1>Ransomware Overview</h1>
            <button onClick={() => setIsFormVisible(true)} className="open-form-button">
                Add New Data
            </button>
            {isFormVisible && (
                <div className="form-container">
                    <RansomwareForm 
                        existingData={existingData} 
                        setExistingData={setExistingData} 
                        fetchRansomwareData={fetchRansomwareData} // Pass fetch function
                        onAddOrUpdateData={handleAddOrUpdateData} // Pass the function to update data
                    />
                    <button onClick={handleCloseForm} className="close-form-button">Close Form</button>
                </div>
            )}

<div className="table-container">
    <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extensions</th>
                    <th>Encryption Algorithm</th>
                    <th>Ransom Note Filenames</th>
                    <th>Comment</th>
                    <th>Decryptor</th>
                    <th>Extension Pattern</th>
                    <th>IOCs</th>
                    <th>Microsoft Detection Name</th>
                    <th>Microsoft Info</th>
                    <th>Resources</th>
                    <th>Sandbox</th>
                    <th>Screenshots</th>
                    <th>Snort</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item._id}>
                        <td>{item.name.join(', ')}</td>
                        <td>{item.extensions}</td>
                        <td>{item.encryptionAlgorithm}</td>
                        <td>{item.ransomNoteFilenames}</td>
                        <td>{item.comment || 'N/A'}</td>
                        <td>{item.decryptor || 'N/A'}</td>
                        <td>{item.extensionPattern || 'N/A'}</td>
                        <td>{item.iocs || 'N/A'}</td>
                        <td>{item.microsoftDetectionName || 'N/A'}</td>
                        <td>{item.microsoftInfo || 'N/A'}</td>
                        <td>{item.resources.join(', ')}</td>
                        <td>{item.sandbox || 'N/A'}</td>
                        <td>{item.screenshots || 'N/A'}</td>
                        <td>{item.snort || 'N/A'}</td>
                        <td>
                            <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
                            <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
        </iv>
    );
};

export default Dashboard;
