import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../../api";

const Detail = () => {
  const [result, setResult] = useState();
  const [isMovie, setIsMovie] = useState(
    window.location.pathname.includes("/movie/")
  );
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  // useEffect(() => {
  //   async function getFilmDetail() {
  //     const {
  //       match: {
  //         params: { id },
  //       },
  //       history: { push },
  //     } = this.props;
  //     const { isMovie } = this.state;
  //     const parsedId = parseInt(id);
  //     if (isNaN(parsedId)) {
  //       return push("/");
  //     }
  //     let result = null;
  //     try {
  //       if (isMovie) {
  //         ({ data: result } = await moviesApi.movieDetail(parsedId));
  //       } else {
  //         ({ data: result } = await tvApi.showDetail(parsedId));
  //       }
  //       setResult(result);
  //     } catch {
  //       setError("Can't find anything.");
  //     } finally {
  //       setLoading(false);
  //       setResult(result);
  //     }
  //   }
  //   console.log(window.location.pathname);
  //   getFilmDetail();
  // }, []);

  return <div>{console.log(isMovie)}</div>;
};

export default Detail;
