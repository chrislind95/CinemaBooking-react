export default function AdminList({ movies, setEditingMovie, refreshMovies }) {
    async function handleDelete(id) {
        if(!window.confirm("Are you sure you want to delete this movie?")) return;

        try {
            await fetch(`http://localhost:3001/movies/${id}`, {
                method: "DELETE",
            });
            refreshMovies();
        }catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Movies</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.title} ({movie.price} kr){" "}
                        <button onClick={() => setEditingMovie(movie)}>Edit</button>
                        <button onClick={() => handleDelete(movie.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}