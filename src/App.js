import React, { useState } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';  // Import GoogleAuthProvider for Google Sign-In

import { storage } from './firebaseConfig'; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase functions
import { auth } from './firebaseConfig';  // Import the auth object
import { signInWithEmailAndPassword } from 'firebase/auth';  // Firebase auth functions
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import './App.css';  


function App() {
  return (
    <Router>
      <div className="App">
      <Login /> {/* Add Login Component to the main app */}
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

//login FUNC
function Login() {
  const [user, setUser] = useState(null);

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('Logged in with Google:', result.user);
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  // Monitor authentication state
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
}



//////----END LOGIN----///////

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
  const [uploadProgress, setUploadProgress] = useState(0);  // Track upload progress
  const [downloadURL, setDownloadURL] = useState('');  // Store the download URL of the uploaded file
  const [user, setUser] = useState(null);

  // Check if the user is authenticated
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();  // Clean up the listener on component unmount
  }, []);
  ////------END----///

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Set the selected file
  };

  // Handle form submission 
  const handleSubmit = (event) => {
    event.preventDefault();

    if (user && selectedFile) {

      const storageRef = ref(storage, `events/${id}/${selectedFile.name}`);  // Create a reference in Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);  // Upload the file

      // Monitor upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Upload failed:', error);
        },
        () => {
          // Get download URL after upload completes
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
            console.log('File available at', url);
          });
        }
      );
    }else {
      console.log("You must be logged in to upload a file");
    }
  };

  

  return (
    <div>
      <h1>Event ID: {id}</h1>
      <p>Here, users will upload their event photos.</p>

      {user ? (
        <>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Photo</button>
      </form>

      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      {downloadURL && (
        <div>
          <p>Upload complete! View your image: <a href={downloadURL} target="_blank" rel="noopener noreferrer">here</a></p>

          
        </div>
      )}

</>
      ) : (
        <p>You must be logged in to upload files.</p>
      )}

      

    </div>
  );
}

export default App;
