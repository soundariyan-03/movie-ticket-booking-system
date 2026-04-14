import { useState } from "react";
import "./App.css";

function App() {

  const movies = [
    {
      name: "Leo",
      image:"https://th-i.thgim.com/public/news/national/tamil-nadu/rpcr5i/article67433049.ece/alternates/LANDSCAPE_1200/Leo%20poster%20Vijay%206.jpg"
    },
    {
      name: "Jailer",
      image: "https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/MINITV/MOVIE/68dbec8af601d82b44e5aa06/images/LANDSCAPE_169/JAILER_16x9.jpg?o=production"
    },
    {
      name: "Dhurandhar",
      image: "https://c.ndtvimg.com/2025-12/6tm88d4c_dhurandhar_625x300_26_December_25.jpg"
    },
    {
      name: "KGF",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLi7RLYmKjo7HN-LZUDYp17upRn-a8ZGDRRQ&s"
    }
  ];

  const ticketPrice = 150;

  const [selectedMovie, setSelectedMovie] = useState("");
  const [seats, setSeats] = useState(Array(20).fill("available"));
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🎬 Select Movie
  const handleMovieChange = (e) => {
    setSelectedMovie(e.target.value);

    const newSeats = Array(20).fill("available");
    newSeats[2] = "booked";
    newSeats[5] = "booked";
    newSeats[10] = "booked";

    setSeats(newSeats);
    setTotal(0);
    setError("");
    setSuccess("");
  };

  // 💺 Seat Selection
  const toggleSeat = (index) => {
    const newSeats = [...seats];

    if (newSeats[index] === "booked") return;

    newSeats[index] =
      newSeats[index] === "selected" ? "available" : "selected";

    setSeats(newSeats);

    const count = newSeats.filter(s => s === "selected").length;
    setTotal(count * ticketPrice);
  };

  // 🎟 Booking
  const bookTickets = () => {

    const selectedCount = seats.filter(s => s === "selected").length;

    if (!selectedMovie) {
      setError("⚠️ Please select a movie first!");
      setSuccess("");
      return;
    }

    if (selectedCount === 0) {
      setError("⚠️ Please select at least one seat!");
      setSuccess("");
      return;
    }

    const newSeats = seats.map(seat =>
      seat === "selected" ? "booked" : seat
    );

    setSeats(newSeats);
    setError("");
    setSuccess("🎟 Tickets Booked Successfully!");
    setTotal(0);
  };

  const selectedMovieData = movies.find(
    (m) => m.name === selectedMovie
  );

  return (
    <div className="container">
      <h1>🎬 Movie Booking System</h1>

      {/* Dropdown */}
      <select onChange={handleMovieChange}>
        <option>Select Movie</option>
        {movies.map((m, i) => (
          <option key={i} value={m.name}>
            {m.name}
          </option>
        ))}
      </select>

      {/* 🎬 Selected Image */}
      {selectedMovie && selectedMovieData && (
        <div className="movie-banner">
          <img src={selectedMovieData.image} alt={selectedMovie} />
        </div>
      )}

      {/* Messages */}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Booking */}
      {selectedMovie && (
        <>
          <h2>{selectedMovie}</h2>

          <div className="screen">SCREEN</div>

          <div className="seats">
            {seats.map((seat, i) => (
              <button
                key={i}
                className={seat}
                onClick={() => toggleSeat(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* ✅ Legend FIXED POSITION */}
          <div className="legend">
            <div className="legend-item">
              <span className="box available"></span> Available
            </div>
            <div className="legend-item">
              <span className="box selected"></span> Selected
            </div>
            <div className="legend-item">
              <span className="box booked"></span> Booked
            </div>
          </div>

          <h3>
            💺 Seats: {seats.filter(s => s === "selected").length}
          </h3>

          <h3>💰 Total: ₹{total}</h3>

          <button className="book-btn" onClick={bookTickets}>
            Book Ticket
          </button>
        </>
      )}
    </div>
  );
}

export default App;