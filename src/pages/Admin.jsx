import { useState, useEffect } from "react";
import AdminForm from "../components/AdminForm.jsx";
import AdminList from "../components/AdminList.jsx";

export default function Admin() {
    const [movies, setMovies] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null);

    async function loadMovies(){
        try{
            const res = await fetch("http://localhost:3001/movies");
            const data = await res.json();
            setMovies(data);
        }catch(error){
            console.error("Error loading movies:", error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await loadMovies();
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin - Manage Movies</h1>

            <AdminForm
            refreshMovie={loadMovies}
            editingMovie={editingMovie}
            clearEditing={() => setEditingMovie(null)}
            />

            <AdminList
            movies={movies}
            setEditingMovie={setEditingMovie}
            refreshMovie={loadMovies}
            />
        </div>
    );
}