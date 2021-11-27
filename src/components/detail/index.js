import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../../api";
import { useParams } from "react-router-dom";
import "./detail.css";
import popcorn from "../../assets/noPosterSmall.png";
const Detail = () => {
  const [result, setResult] = useState();
  const [isMovie, setIsMovie] = useState(
    window.location.pathname.includes("/movie/")
  );
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { id } = useParams();
  useEffect(() => {
    async function getFilmDetail() {
      const parsedId = parseInt(id);
      // if (isNaN(parsedId)) {
      //   window.location.href = "/";
      // }
      let result = null;
      try {
        if (isMovie) {
          ({ data: result } = await moviesApi.movieDetail(parsedId));
        } else {
          ({ data: result } = await tvApi.showDetail(parsedId));
        }
        setResult(result);
      } catch {
        setError("Can't find anything.");
      } finally {
        setLoading(false);
        setResult(result);
      }
    }
    getFilmDetail();
  }, []);

  return (
    loading == false && (
      <div className="detail-container">
        <div
          className="detail-backdrop"
          style={{
            backgroundImage: result.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`
              : `url(${popcorn})`,
          }}
        />
        <div className="detail-content">
          <div
            className="detail-cover"
            style={{
              backgroundImage: result.poster_path
                ? `url(https://image.tmdb.org/t/p/original${result.poster_path})`
                : `url(${popcorn})`,
            }}
          />
          <div className="detail-data">
            <h3 className="detail-title">
              {result.original_title
                ? result.original_title
                : result.original_name}
            </h3>
            <div className="detail-itemcontainer">
              <span className="detail-item">
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </span>
              <span className="detail-divider">•</span>
              <span className="detail-item">
                {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                min
              </span>
              <span className="detail-divider">•</span>
              <span className="detail-item">
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </span>
              <span className="detail-divider">•</span>
              <span className="detail-item">
                {result.vote_average ? `⭐️${result.vote_average}/10` : ``}
              </span>
            </div>
            <p className="detail-overview">{result.overview}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Detail;
