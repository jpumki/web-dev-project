const URL = "http://localhost:4000/profile";

export const findAllProfile = () =>
  fetch(`${URL}`).then((response) => response.json());

export const findProfileById = (id) =>
  fetch(`${URL}/${id}`).then((response) => response.json());

export const createProfile = (profile) =>
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

export const handleFilm = (profile) => {
  fetch(`${URL}/${profile._id}/movie`, {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
};

export const handleFollower = (profile) => {
  fetch(`${URL}/${profile._id}/follower`, {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
};

export const handleFollowing = (profile) => {
  fetch(`${URL}/${profile._id}/following`, {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
};

export default {
  findProfileById,
  findAllProfile,
  createProfile,
  handleFilm,
  handleFollower,
  handleFollowing,
};
