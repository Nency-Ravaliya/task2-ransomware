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
            // Use HTTPS for API calls
            const result = await axios.get('https://task2-web-app-ajeyayfpdqhdh2ec.centralindia-01.azurewebsites.net/ransomware');
            // Sort data in reverse order
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
            fetchRansomwareData(); // Refresh the data
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleCloseForm = () => {
        setIsFormVisible(false); // Hide the form when closed
        setExistingData(null); // Reset the existing data
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error fetching data!</div>;

    return (
        <div className="dashboard">
            <h1>Ransomware Overview</h1>
            <button onClick={() => setIsFormVisible(true)} className="open-form-button">
                Add New Data
            </button>
            {isFormVisible && (
                <div className="form-container">
                    <RansomwareForm 
                        fetchRansomwareData={fetchRansomwareData} 
                        existingData={existingData} 
                        setExistingData={setExistingData} 
                        onClose={handleCloseForm} // Pass close handler to form
                    />
                    <button onClick={handleCloseForm} className="close-form-button">Close Form</button>
                </div>
            )}

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Extension</th>
                            <th>Encryption</th>
                            <th>Notes</th>
                            <th>Links</th>
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
                                <td>{item.resources.join(', ')}</td>
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
    );
};

export default Dashboard;
