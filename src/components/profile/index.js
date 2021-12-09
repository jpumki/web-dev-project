import React, { useEffect, useState } from "react";
import "./profile.css";
import service from "../../service/service";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar.png";
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
    };
    newProfile.followers.push(newFollower);
    service.handleFollower(newProfile);

    const newUser = user;
    const newFollowing = {
      id: profile._id,
      name: profile.name,
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
          <div className="mt-4">
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
    <div className="d-flex align-items-baseline">
      <div>
        <img src={avatar} className="profile-avatar" />
      </div>
      <span>{profile.name}</span>
      <div>
        <img />
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
      <div className="profile-info-container">
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
  return <div>Follower</div>;
};

const ProfileFollowingCard = ({ profile }) => {
  return <div>Following</div>;
};

const MovieCard = ({ profile }) => {
  return (
    <div>
      {profile.movieList.length > 0 && (
        <ul className="flex-wrap">
          {profile.movieList.map((movie) => {
            return (
              <li className="col-2 mt-4 mb-2 h-100 cursor-pointer card-container">
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
                        {movie.name.length > 20
                          ? `${movie.name.substring(0, 20)}...`
                          : movie.name}
                      </span>
                      <span className="movie-year">
                        {movie.year.substring(0, 4)}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Profile;
