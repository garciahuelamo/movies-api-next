import { useState } from 'react';
import Link from 'next/link';
import { fetchMoviesByQuery } from '../lib/tmdb';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const movies = await fetchMoviesByQuery(query);
      setResults(movies ?? []);
    } catch (err) {
      console.error('Error buscando:', err);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Buscar Películas</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe un título..."
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}

      {!loading && results.length === 0 && query && (
        <p>No se encontraron resultados.</p>
      )}

      <ul>
        {results.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}