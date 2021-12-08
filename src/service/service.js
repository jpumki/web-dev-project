const URL = "http://localhost:4000/profile";

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

export default {
  findProfileById,
  createProfile,
  handleFilm,
};
