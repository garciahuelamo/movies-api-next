import { fetchMovieById } from '../../lib/tmdb';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const movie = await fetchMovieById(id);

  if (!movie || movie.success === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
}

export default function MovieDetail({ movie }) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p><strong>Sinopsis:</strong> {movie.overview}</p>
      <p><strong>Calificación:</strong> {movie.vote_average}</p>
      <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ maxWidth: '300px' }}
        />
      )}
    </div>
  );
}