import React, { useEffect, useState } from "react";
import "./profile.css";
import service from "../../service/service";
import { useParams } from "react-router-dom";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../../utils/bigheadGen";
import popcorn from "../../assets/noPosterSmall.png";
const Profile = ({ auth }) => {
  const [profile, setProfile] = useState();
  const [initProfile, setInitProfile] = useState(false);
  const [initUser, setInitUser] = useState(false);
  const [user, setUser] = useState();
  const [follow, setFollow] = useState(false);
  const [followerIndex, setFollowerIndex] = useState();
  const [followingIndex, setFollowingIndex] = useState();
  const { id } = useParams();

  const findProfileById = (id, uid) => {
    service.findProfileById(id).then((profile) => {
      if (profile === null) {
        window.location.href = "/";
      } else {
        setProfile(profile);
        if (profile.followers.length > 0) {
          for (var i = 0; i < profile.followers.length; i++) {
            if (profile.followers[i].id == uid) {
              setFollow(true);
              setFollowerIndex(i);
            }
          }
        }
        setInitProfile(true);
      }
    });
  };

  const findUserById = (uid) => {
    service.findProfileById(uid).then((user) => {
      if (user === null) {
        window.location.href = "/";
      } else {
        setUser(user);
        if (user.followings.length > 0) {
          for (var i = 0; i < user.followings.length; i++) {
            if (user.followings[i].id == id) {
              setFollow(true);
              setFollowingIndex(i);
            }
          }
        }
        setInitUser(true);
      }
    });
  };

  const onClickFollow = () => {
    const newProfile = profile;
    const newFollower = {
      id: user._id,
      name: user.name,
      role: user.role,
    };
    newProfile.followers.push(newFollower);
    service.handleFollower(newProfile);

    const newUser = user;
    const newFollowing = {
      id: profile._id,
      name: profile.name,
      role: user.role,
    };
    newUser.followings.push(newFollowing);
    service.handleFollowing(newUser);

    setFollow(true);
  };

  const onClickUnFollow = () => {
    const newProfile = profile;
    newProfile.followers.splice(followerIndex, 1);
    service.handleFollower(newProfile);

    const newUser = user;
    newUser.followings.splice(followingIndex, 1);
    service.handleFollowing(newUser);

    setFollow(false);
  };

  useEffect(() => {
    async function userInfo() {
      await auth.onAuthStateChanged((user) => {
        if (!user) {
          window.location.href = "/";
        } else {
          findUserById(user.uid);
          findProfileById(id, user.uid);
        }
      });
    }
    userInfo();
  }, []);

  return (
    <div className="m-4">
      {initProfile && initUser && (
        <div>
          <div>
            <ProfileHeader
              user={user}
              profile={profile}
              id={id}
              follow={follow}
              onClickFollow={onClickFollow}
              onClickUnFollow={onClickUnFollow}
            />
          </div>
          <div className="mt-3">
            <ProfileBrowser profile={profile} />
          </div>
          <div>
            <ProfileDetail profile={profile} />
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileHeader = ({
  user,
  profile,
  id,
  follow,
  onClickFollow,
  onClickUnFollow,
}) => {
  return (
    <div className="d-flex">
      <div className="profile-avatar">
        <BigHead {...getRandomOptions()} />
      </div>
      <div className="d-flex align-items-baseline flex-column justify-content-end">
        <span className="profile-name fw-bold mb-1">{profile.name}</span>
        <div className="profile-year mb-2">
          <span>Member Since {profile.date.substring(0, 4)}</span>
        </div>
        <div>
          {user._id !== id && (
            <>
              {follow ? (
                <button
                  className="btn btn-danger follow-btn"
                  onClick={() => {
                    onClickUnFollow();
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn btn-danger follow-btn"
                  onClick={() => {
                    onClickFollow();
                  }}
                >
                  Follow
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileBrowser = ({ profile }) => {
  const [tab, setTab] = useState("followers");
  const onClickTab = (name) => {
    setTab(name);
  };

  const tabs = ["followers", "followings", "favorites"];
  const profileTabInfo = [
    {
      key: "followers",
      contents: <ProfileFollowerCard profile={profile} />,
    },
    {
      key: "followings",
      contents: <ProfileFollowingCard profile={profile} />,
    },
    {
      key: "favorites",
      contents: <MovieCard profile={profile} />,
    },
  ];

  return (
    <div>
      <div>
        {tabs.map((elem) => {
          return (
            <button
              name={elem}
              className={`text-capitalize ${elem == tab && "selected"}`}
              onClick={(e) => {
                onClickTab(e.target.name);
              }}
            >
              {elem}
            </button>
          );
        })}
      </div>
      <div className="profile-info-container" id="scroll-style">
        {profileTabInfo.map((elem) => {
          return <div>{elem.key === tab && elem.contents}</div>;
        })}
      </div>
    </div>
  );
};

const ProfileDetail = ({ profile }) => {
  return (
    <div>
      <h1>Account</h1>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const ProfileFollowerCard = ({ profile }) => {
  const gotoProfile = (id) => {
    debugger;
    window.location.href = `/profile/${id}`;
  };

  return (
    <div className="section-grid mt-0">
      {profile.followers.map((elem) => {
        return (
          <p
            className="person-container cursor-pointer mt-3 mx-2"
            onClick={() => {
              gotoProfile(elem.id);
            }}
          >
            <Poster person={elem} />
          </p>
        );
      })}
    </div>
  );
};

const ProfileFollowingCard = ({ profile }) => {
  const gotoProfile = (id) => {
    debugger;
    window.location.href = `/profile/${id}`;
  };

  return (
    <div className="section-grid mt-0">
      {profile.followings.map((elem) => {
        return (
          <p
            className="person-container cursor-pointer mt-3 mx-2"
            onClick={() => {
              gotoProfile(elem.id);
            }}
          >
            <Poster person={elem} />
          </p>
        );
      })}
    </div>
  );
};

const MovieCard = ({ profile }) => {
  return (
    <div>
      {profile.movieList.length > 0 && (
        <div className="section-grid mt-3">
          {profile.movieList.map((movie) => {
            return (
              <p className="mx-2 cursor-pointer card-container">
                <a
                  href={
                    movie.type === 0
                      ? `/movie/${movie.id}`
                      : `/show/${movie.id}`
                  }
                >
                  <div>
                    <div>
                      <img
                        className="movie-card-img"
                        src={
                          movie.img
                            ? `https://image.tmdb.org/t/p/w300${movie.img}`
                            : popcorn
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-center flex-column mt-2">
                      <span className="fw-bold">
                        {movie.name.length > 13
                          ? `${movie.name.substring(0, 13)}...`
                          : movie.name}
                      </span>
                      <span className="movie-year">
                        {movie.year.substring(0, 4)}
                      </span>
                    </div>
                  </div>
                </a>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Poster = ({ person }) => {
  var randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

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
    <div className="poster-container ">
      <div className="poster-imgcontainer">
        <div
          className="poster-img d-flex justify-content-center align-items-center"
          style={{ backgroundColor: `${randomColor}` }}
        >
          <BigHead {...getRandomOptions()} />
        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <span className="poster-title fw-bold">{person.name}</span>
        <span className="poster-role text-capitalize">{`${roleFinder(
          person.role
        )}`}</span>
      </div>
    </div>
  );
};

export default Profile;
