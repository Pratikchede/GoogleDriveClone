// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = ({ authToken }) => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     axios.post('http://localhost:5000/upload', formData, {
//       headers: {
//         'Authorization': `Bearer ${authToken}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then(response => {
//         alert('File uploaded successfully!');
//       })
//       .catch(error => {
//         console.error('File upload failed', error);
//       });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload File</button>
//     </div>
//   );
// };

// export default FileUpload;


import React, { useState } from 'react';
import { uploadFile } from '../api';

const FileUpload = ({ token }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const response = await uploadFile(file, token);
      alert('File uploaded successfully!');
    } catch (error) {
      alert('Error uploading file.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
