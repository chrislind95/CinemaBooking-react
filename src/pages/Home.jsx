import { useEffect, useState } from "react";
import { getMovies } from "../services/MovieService.js";
import SeatGrid from "../components/SeatGrid.jsx";
import BookingForm from "../components/BookingForm.jsx";
import '../App.css';

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const moviesData = await getMovies();
      setMovies(moviesData);
      setSelectedMovie(moviesData[0]);

      const res = await fetch("http://localhost:3001/bookings");
      const bookingsData = await res.json();
      setBookings(bookingsData);
    }

    loadData();
  }, []);

  async function loadBookings() {
    const res = await fetch("http://localhost:3001/bookings");
    const data = await res.json();
    setBookings(data);
  }

  const ticketPrice = selectedMovie?.price || 0;
  const totalPrice = selectedSeats.length * ticketPrice;

  const occupiedSeats =
    bookings
      .filter(booking => booking.movieId === selectedMovie?.id)
      .flatMap(booking => booking.seats.map(Number));

  return (
    <div className="home-container">
      <h1 className="main-title">Movie Seat Booking</h1>

      <div className="movie-container">
      {movies.length > 0 && (
        <select
          value={selectedMovie?.id || ""}
          onChange={e => {
            const movieId = e.target.value;
            const movie = movies.find(m => m.id === movieId);
            setSelectedMovie(movie);
            setSelectedSeats([]);
          }}
        >
          {movies.map(movie => (
            <option key={movie.id} value={movie.id}>
              {movie.title} ({movie.price} kr)
            </option>
          ))}
        </select>
      )}
      </div>

      <SeatGrid
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        occupiedSeats={occupiedSeats}
      />

      <div className="selected-info">
        Selected seats: <span>{selectedSeats.length}</span> | 
        Total: <span>{totalPrice}</span> kr

        {selectedSeats.length > 0 && (
          <button onClick={() => setShowForm(true)}>
            Boka
          </button>
        )}
      </div>

      {showForm && (
        <BookingForm
          selectedSeats={selectedSeats}
          selectedMovie={selectedMovie}
          onClose={() => setShowForm(false)}
          refreshBookings={loadBookings}
          resetSeats={() => setSelectedSeats([])}
        />
      )}
    </div>
  );
}