import { useState } from "react";

export default function BookingForm({ selectedSeats, selectedMovie, onClose, refreshBookings, resetSeats }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});

    function validate() {
        const newErrors = {};

        if(name.trim().length < 2){
            newErrors.name = "Name must be at least 2 characters";
        }
        if(!/^[0-9]{7,}$/.test(phone)){
            newErrors.phone = " Phone must contain at least 7 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(!validate()) return;

        const booking = {
            name,
            phone,
            movieId: selectedMovie.id,
            seats: selectedSeats
        };

        try {
            await fetch("http://localhost:3001/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        });

        await refreshBookings();
        alert("Booking saved!");
        onClose();
        resetSeats();
        
        } catch(error){
            console.error(error);
        }
    
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Seats</h2>

            <div>
                <label>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <p>{errors.name}</p>}
            </div>

            <div>
                <label>Phone</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} />
                {errors.phone && <p>{errors.phone}</p>}
            </div>

            <button type="submit">Confirm Booking</button>
            <button type="button" onClick={onClose}>
                Cancel
            </button>
        </form>
    );
}