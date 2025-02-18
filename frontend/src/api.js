// import axios from 'axios';

// const API_URL = 'http://localhost:5000';

// export const signup = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/signup`, { username, password });
//     return response.data;
//   } catch (error) {
//     console.error('Error during signup:', error);
//     throw error;
//   }
// };

// export const login = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { username, password });
//     return response.data;
//   } catch (error) {
//     console.error('Error during login:', error);
//     throw error;
//   }
// };

// export const uploadFile = async (file, token) => {
//   const formData = new FormData();
//   formData.append('file', file);
  
//   try {
//     const response = await axios.post(`${API_URL}/upload`, formData, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw error;
//   }
// };


import { useState, useEffect } from "react";

function App() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/files")
            .then((res) => res.json())
            .then((data) => setFiles(data));
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        window.location.reload();
    };

    return (
        <div>
            <h2>Google Drive Clone</h2>

            <form onSubmit={handleUpload}>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>

            <h3>Uploaded Files</h3>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        <a href={`http://localhost:5000${file.filepath}`} target="_blank" rel="noopener noreferrer">
                            {file.filename}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
