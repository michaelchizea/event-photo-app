import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import './App.css';  // Keep any existing imports

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Route for individual event pages, with dynamic event IDs */}
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}
// g
// HomePage component
function HomePage() {
  return (
    <div>
      <h1>Welcome to the Event Photo App!</h1>
      <p>Select the event to upload photos.</p>
    </div>
  );
}

// EventPage component with dynamic event ID
function EventPage() {
  const { id } = useParams(); // useParams hook to get the dynamic id from the URL
  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Set the selected file
  };

  // Handle form submission 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <h1>Event ID: {id}</h1>
      <p>Here, users will upload their event photos.</p>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Photo</button>
      </form>

    </div>
  );
}

export default App;
