import React, { useState } from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";

const likes = (movie_id) => gql`
  subscription {
    likes(where: {movie_id: {_eq: "${movie_id}"}}) {
        id
        user_id
    }
  }
`;

const LIKE = gql`
  mutation like($movie_id: uuid!) {
    insert_likes(objects: {movie_id: $movie_id}) {
        affected_rows
    }
  }
`;

const UNLIKE = gql`
    mutation unlike($movie_id: uuid!) {
        delete_likes(where: {movie_id: {_eq: $movie_id}}) {
            affected_rows
        }
    }
`;

function App({movie}) {
  const LIKE_COUNT = likes(movie.id);
  const [addLike, { like_data, like_loading, error }] = useMutation(LIKE);
  const [unLike, _] = useMutation(UNLIKE);

  const [isRed, setIsRed] = useState(false);
  const { data, loading } = useSubscription(LIKE_COUNT);
  console.log(data, movie);
  if (loading) {
    return <div>Loading</div>;
  }
  const likeThis = () => {
    setIsRed(!isRed);
    if (isRed) {
        unLike({variables: {movie_id: movie.id}});
    } else {
        addLike({ variables: { movie_id: movie.id }});
    }
  }
  return (
    <span>
        {data.likes.length}
        <i className="fa fa-heart" style={{"color": isRed ? "red" : "gray"}} aria-hidden="true" onClick={likeThis}></i>
    </span>
  );
}

export default App;
