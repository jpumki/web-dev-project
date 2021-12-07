const URL = "http://localhost:4000/profile";

export const createProfile = (profile) =>
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

export default {
  createProfile,
};
