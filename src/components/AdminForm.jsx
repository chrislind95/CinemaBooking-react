 import { useState } from "react";

 export default function AdminForm({ refreshMovie, editingMovie, clearEditing }) {
     const [title, setTitle] = useState("");
     const [price, setPrice] = useState("");

     async function handleSubmit(e) {
         e.preventDefault();

         if(!title || price <= 0){
             alert("Please enter a valid title and price");
             return;
         }

         const movieData = { title, price: Number(price) };
         try{
             if(editingMovie){
                 await fetch(`http://localhost:3001/movies/${editingMovie.id}`, {
                 method: "PUT",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(movieData),
             });
             clearEditing();
             }else {
                 await fetch("http://localhost:3001/movies", {
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify(movieData),
                 });
             }

             setTitle("");
             setPrice("");
             refreshMovie();
             alert(editingMovie ? "Movie updated!" : "Movie added!");

         }catch(error){
             console.error(error);
         }
     }

     return (
         <form onSubmit={handleSubmit}>
             <h2>{editingMovie ? "Edit Movie" : "Add New Movie"}</h2>
             <div>
                 <label>Title:</label>
                 <input value={title} onChange={e => setTitle(e.target.value)} />
             </div>
             <div>
                 <label>Price:</label>
                 <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
             </div>

             <button type="submit">{editingMovie ? "Update" : "Add"}</button>
             {editingMovie && (
                 <button type="button" onClick={clearEditing}>Cancel</button>
             )}
         </form>
     );
 }