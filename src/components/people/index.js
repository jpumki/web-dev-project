import React, { useState, useEffect } from "react";
import service from "../../service/service";
import Profile from "../profile";
import "./people.css";
import Swal from "sweetalert2";
const People = ({ auth }) => {
  const [people, setPeople] = useState();
  const [isLogginIn, setIsLoggin] = useState(false);
  const [init, setInit] = useState(false);
  const findAllProfile = (id) => {
    service.findAllProfile().then((people) => {
      setPeople(people);
      setInit(true);
    });
  };

  useEffect(() => {
    async function userInfo() {
      await auth.onAuthStateChanged((user) => {
        findAllProfile();
        if (user) {
          setIsLoggin(true);
        }
      });
    }
    userInfo();
  }, []);

  const gotoProfile = (id) => {
    if (isLogginIn) {
      window.location.href = `/profile/${id}`;
    } else {
      Swal.fire({
        icon: "error",
        title: "You need to login to see profile",
      }).then(() => {
        window.location.href = "/login";
      });
    }
  };

  return (
    <div>
      <div>
        <h1>People</h1>
      </div>
      {init && (
        <div>
          <ul>
            {people.map((elem) => {
              return (
                <li
                  className="mx-2 col-1 person-container"
                  onClick={() => {
                    gotoProfile(elem._id);
                  } }
                >
                  <ProfileCard person={elem} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const ProfileCard = ({ person }) => {
  return (
    <p className="container">
      <p className="card" style={{ float: "left" }}>
        <img
          style={{
            height: "70px",
            width: "70px",
            borderRadius: "50%",
            margin: "auto auto 15px",
            display: "block",
          }}
          src="https://i.pinimg.com/originals/e2/c7/ba/e2c7ba0ef1467ac03b077275e14a9247.jpg"
        />
        <p>{person.name}</p>
        <p style={{ color: "gray" }}>Profile</p>
      </p>
    </p>
  );
};

export default People;
