import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Movie Context for managing movie data
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  // Fetch Movies from Firebase
  useEffect(() => {
    const fetchMovies = async () => {
      const querySnapshot = await getDocs(collection(db, "movies"));
      setMovies(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchMovies();
  }, []);

  // Add a Movie
  const addMovie = async (movie) => {
    const docRef = await addDoc(collection(db, "movies"), movie);
    setMovies((prev) => [...prev, { id: docRef.id, ...movie }]);
  };

  // Edit a Movie
  const editMovie = async (id, updatedMovie) => {
    const movieRef = doc(db, "movies", id);
    await updateDoc(movieRef, updatedMovie);
    setMovies((prev) => prev.map(movie => movie.id === id ? { ...movie, ...updatedMovie } : movie));
  };

  // Delete a Movie
  const deleteMovie = async (id) => {
    await deleteDoc(doc(db, "movies", id));
    setMovies((prev) => prev.filter(movie => movie.id !== id));
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, editMovie, deleteMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

// Movies Page - View Movies
const MoviesPage = () => {
  const { movies, deleteMovie } = useContext(MovieContext);

  return (
    <div>
      <h1>Movie List</h1>
      <Link to="/add-movie">Add New Movie</Link>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>{movie.releaseYear}</p>
            <Link to={`/add-movie/${movie.id}`}>Edit</Link>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Add or Edit Movie Page
const AddMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMovie, editMovie, movies } = useContext(MovieContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  // If editing, pre-fill form with movie details
  useEffect(() => {
    if (id) {
      const movie = movies.find((movie) => movie.id === id);
      if (movie) {
        setTitle(movie.title);
        setDescription(movie.description);
        setReleaseYear(movie.releaseYear);
      }
    }
  }, [id, movies]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !releaseYear) {
      alert('Please fill in all fields');
      return;
    }

    const newMovie = { title, description, releaseYear };
    if (id) {
      editMovie(id, newMovie);
    } else {
      addMovie(newMovie);
    }

    navigate('/movies');
  };

  return (
    <div>
      <h1>{id ? 'Edit Movie' : 'Add Movie'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button type="submit">{id ? 'Update Movie' : 'Add Movie'}</button>
      </form>
    </div>
  );
};

// App Component - Set up Routing
const App = () => {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/add-movie/:id" element={<AddMoviePage />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
};

export default App;
