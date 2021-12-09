import React, { useState, useEffect } from "react";
import service from "../../service/service";
import "./people.css";
import Swal from "sweetalert2";
import avator from "../../assets/avatar.png";
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
    <div className="people-container">
      <div className=" section-title">Connect with others</div>
      {init && (
        <div>
          <div className="section-grid mt-0">
            {people.map((elem) => {
              return (
                <p
                  className="person-container cursor-pointer mt-3"
                  onClick={() => {
                    gotoProfile(elem._id);
                  }}
                >
                  <Poster person={elem} />
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Poster = ({ person }) => {
  const roleFinder = (role) => {
    switch (role) {
      case 1:
        return "student";
      case 2:
        return "professor";
      case 3:
        return "reviewer";
    }
  };

  return (
    <div className="poster-container">
      <div className="poster-imgcontainer">
        <div
          className="poster-img"
          style={{
            backgroundImage: person.img
              ? `url(${person.img})`
              : `url(${avator})`,
          }}
        />
      </div>
      <div className="d-flex flex-column align-items-center">
        <span className="poster-title">{person.name}</span>
        <span className="poster-year">{`${roleFinder(person.role)}`}</span>
      </div>
    </div>
  );
};

export default People;
