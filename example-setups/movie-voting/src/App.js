import './App.css';
import { gql, useSubscription } from "@apollo/client";
import LikeCountComponent from "./components/likeCount";

const GET_MOVIES = gql`
  subscription {
    movies {
      id
      created_at
      name
      image
    }
  }
`;



function App() {
  const { data, loading } = useSubscription(GET_MOVIES);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Movies list
        </p>
      </header>
      {
        data && data.movies && data.movies.length ?
        data.movies.map((movie, index) => {
          return (
              <div className="movie-box" key={index}>
                <div className="movie-box-header">
                </div>
                <div className="movie-box-body">
                  <img alt={movie.name} className="movie-image" src={movie.image} />
                </div>
                <div className="movie-box-footer">
                  {movie.name}
                  <div className="like-button"><LikeCountComponent movie={movie} /></div>
                </div>
              </div>
          )
        }) : "No movies"
      }
    </div>
  );
}

export default App;
