import Link from 'next/link';
import { fetchPopularMovies } from '../lib/tmdb';

export async function getServerSideProps() {
  const movies = await fetchPopularMovies();
  return { props: { movies } };
}

export default function Home({ movies }) {
  return (
    <div>
      <h1>Películas Populares</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}