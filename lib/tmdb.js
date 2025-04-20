const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`);
  const data = await res.json();
  return data.results;
}

export async function fetchMovieById(id) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`);
    const data = await res.json();
    if (!res.ok) {
      console.error('Error TMDb (detalle):', data);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error al obtener detalles de película:', error);
    return null;
  }
}

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES`);
  const data = await res.json();
  return data.results;
}

export async function fetchMoviesByQuery(query) {
  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`);
    const data = await res.json();
    return data.results ?? [];
  } catch (error) {
    console.error('Error buscando películas:', error);
    return [];
  }
}