import React from 'react';
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

// HomePage component
function HomePage() {
  return (
    <div>
      <h1>Welcome to the Event Photo App!</h1>
      <p>Select an event to upload photos.</p>
    </div>
  );
}

// EventPage component with dynamic event ID
function EventPage() {
  const { id } = useParams(); // useParams hook to get the dynamic id from the URL
  return (
    <div>
      <h1>Event ID: {id}</h1>
      <p>Here, users will upload their event photos.</p>
    </div>
  );
}

export default App;
